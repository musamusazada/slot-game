import * as PIXI from 'pixi.js';
import { AssetLoader } from '../utils/AssetLoader';
import { GameState } from '../state/GameState';
import { EventBus } from '../utils/EventBus';
import { GameConfig } from '../config/gameConfig/GameConfig';
import { GameEvents } from '../types/GameEvents';
import { TGameStateData } from '../state/IGameState';
import { TextureNames } from '../config/assetNames/TextureNames';

export class UI {
    public container: PIXI.Container;
    private _app: PIXI.Application;
    private _eventBus: EventBus;
    private _gameState: GameState;
    private _spinButton!: PIXI.Sprite;

    constructor(app: PIXI.Application, eventBus: EventBus, gameState: GameState) {
        this._app = app;
        this._eventBus = eventBus;
        this._gameState = gameState;
        this.container = new PIXI.Container();

        this.createSpinButton();

        this._eventBus.on(GameEvents.STATE_CHANGED, this.onStateChange.bind(this));
    }

    private createSpinButton(): void {
        try {
            this._spinButton = new PIXI.Sprite(AssetLoader.getTexture(TextureNames.BUTTON_SPIN));

            this._spinButton.anchor.set(0.5);
            this._spinButton.x = GameConfig.SCREEN.width / 2;
            this._spinButton.y = GameConfig.SCREEN.height;
            this._spinButton.width = GameConfig.UI.SPIN_BUTTON.width;
            this._spinButton.height = GameConfig.UI.SPIN_BUTTON.height;

            this._spinButton.interactive = true;
            this._spinButton.cursor = 'pointer'
            this._spinButton.on('pointerdown', this.onSpinButtonClick.bind(this));
            this._spinButton.on('pointerover', this.onButtonOver.bind(this));
            this._spinButton.on('pointerout', this.onButtonOut.bind(this));

            this.container.addChild(this._spinButton);
        } catch (error) {
            console.error('Error creating spin button:', error);
        }
    }

    private onSpinButtonClick(): void {
        if(this._gameState.isSpinning) return;

        this._eventBus.emit(GameEvents.SPIN_REQUEST);
    }

    // Game events
    private onStateChange(payload: TGameStateData): void {
        if (payload.isSpinning) {
            this._spinButton.texture = AssetLoader.getTexture(TextureNames.BUTTON_SPIN_DISABLED);
            this._spinButton.interactive = false;
        } else {
            this._spinButton.texture = AssetLoader.getTexture(TextureNames.BUTTON_SPIN);
            this._spinButton.interactive = true;
        }
    }

    // Button events
    private onButtonOver(event: PIXI.FederatedPointerEvent): void {
        (event.currentTarget as PIXI.Sprite).scale.set(1.05);
    }

    private onButtonOut(event: PIXI.FederatedPointerEvent): void {
        (event.currentTarget as PIXI.Sprite).scale.set(1.0);
    }
}
