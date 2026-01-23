import * as PIXI from 'pixi.js';
import { SlotMachine } from '../slots/SlotMachine';
import { AssetLoader } from '../utils/AssetLoader';
import { sound } from '../utils/sound';
import { GameState } from '../state/GameState';
import { EventBus } from '../utils/EventBus';
import { GameConfig } from '../config/gameConfig/GameConfig';
import { GameEvents } from '../types/GameEvents';
import { TGameStateData } from '../state/IGameState';

export class UI {
    public container: PIXI.Container;
    private _app: PIXI.Application;
    private _eventBus: EventBus;
    private _gameState: GameState;
    // TODO: remove slotMachine ref
    private slotMachine: SlotMachine;
    private _spinButton!: PIXI.Sprite;

    constructor(app: PIXI.Application, eventBus: EventBus, gameState: GameState ,slotMachine: SlotMachine) {
        this._app = app;
        this._eventBus = eventBus;
        this._gameState = gameState;
        this.slotMachine = slotMachine;
        this.container = new PIXI.Container();

        this.createSpinButton();

        this._eventBus.on(GameEvents.STATE_CHANGED, this.onStateChange.bind(this));
    }

    private createSpinButton(): void {
        try {
            this._spinButton = new PIXI.Sprite(AssetLoader.getTexture('button_spin.png'));

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

            this.slotMachine.setSpinButton(this._spinButton);
        } catch (error) {
            console.error('Error creating spin button:', error);
        }
    }

    private onSpinButtonClick(): void {
        if(this._gameState.isSpinning) return;

        sound.play('Spin button');

        // TODO: remove second arg after eventBus refactor.
        this._eventBus.emit(GameEvents.SPIN_REQUEST);

        // TODO: remove after machine refactor.
        this.slotMachine.spin();
    }

    // Game events
    private onStateChange(payload: TGameStateData): void {
        if (payload.isSpinning) {
            // TODO: refactor after assetLoader changes, no hard coded strings for access
            this._spinButton.texture = AssetLoader.getTexture('button_spinning.png');
            this._spinButton.interactive = false;
        } else {
            // TODO: same as above
            this._spinButton.texture = AssetLoader.getTexture('button_spin.png');
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
