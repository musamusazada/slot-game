import * as PIXI from 'pixi.js';
import { SlotMachine } from './slots/SlotMachine';
import { AssetLoader } from './utils/AssetLoader';
import { UI } from './ui/UI';
import { GameState } from './state/GameState';
import { EventBus } from './utils/EventBus';
import { AudioService } from './services/audioService/AudioService';
import { AudioConfig } from './config/audioConfig/AudioConfig';
import { StageManager } from './stages/manager/StageManager';
import { SymbolService } from './services/symbolService/SymbolService';
import { GameConfig } from './config/gameConfig/GameConfig';

export class Game {
    private _app: PIXI.Application;
    private _stageManager!: StageManager;
    private _slotMachine!: SlotMachine;
    private _ui!: UI;
    private _assetLoader: AssetLoader;
    private _eventBus: EventBus;
    private _gameState: GameState;
    private _audioService: AudioService; 
    private _symbolService: SymbolService;
    
    constructor() {
        this._app = new PIXI.Application({
            width: 1280,
            height: 800,
            backgroundColor: 0x1099bb,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        const gameContainer = document.getElementById('game-container');
        if (gameContainer) {
            gameContainer.appendChild(this._app.view as HTMLCanvasElement);
        }

        this._assetLoader = new AssetLoader();

        this._eventBus = new EventBus();
        this._gameState = new GameState(this._eventBus);
        this._audioService = new AudioService(AudioConfig);
        this._symbolService = new SymbolService();

        this.init = this.init.bind(this);
        this.resize = this.resize.bind(this);

        window.addEventListener('resize', this.resize);
        (globalThis as any).__PIXI_APP__ = this._app;
        this.resize();
    }

    public async init(): Promise<void> {
        try {
            await this._assetLoader.loadAssets();

            await this._audioService.loadSounds();

            this._stageManager = new StageManager(this._eventBus, this._gameState, this._audioService, this._symbolService);
            this._app.stage.addChild(this._stageManager.container);

            this._ui = new UI(this._app, this._eventBus, this._gameState);
            this._app.stage.addChild(this._ui.container);

            this._app.ticker.add(this.update.bind(this));

            console.log('Game initialized successfully');
        } catch (error) {
            console.error('Error initializing game:', error);
        }
    }

    private update(delta: number): void {
        if (this._slotMachine) {
            this._slotMachine.update(delta);
        }
    }

    private resize(): void {
        if (!this._app || !this._app.renderer) return;

        const gameContainer = document.getElementById('game-container');
        if (!gameContainer) return;

        const w = gameContainer.clientWidth;
        const h = gameContainer.clientHeight;

        // Calculate scale to fit the container while maintaining aspect ratio
        const scale = Math.min(w / GameConfig.SCREEN.width, h / GameConfig.SCREEN.height);

        this._app.stage.scale.set(scale);

        // Center the stage
        this._app.renderer.resize(w, h);
        this._app.stage.position.set(w / 2, h / 2);
        this._app.stage.pivot.set(GameConfig.SCREEN.width / 2, GameConfig.SCREEN.height / 2);
    }
}
