import { Container } from "pixi.js";
import { SymbolService } from "../../services/symbolService/SymbolService";
import { AudioService } from "../../services/audioService/AudioService";
import { GameState } from "../../state/GameState";
import { EventBus } from "../../utils/EventBus";
import { IGameStage } from "../../types/IGameStage";
import { GameEvents } from "../../types/GameEvents";
import { IStageManager } from "./IStageManager";
import { BaseGameStage } from "../gameStages/BaseGameStage";

export class StageManager implements IStageManager {
    public container: Container;

    private _currStage: IGameStage | null = null;

    constructor(
        private _eventBus: EventBus,
        private _gameState: GameState,
        private _audioService: AudioService,
        private _symbolService: SymbolService
    ) {
        this.container = new Container();

        this._eventBus.on(GameEvents.SPIN_REQUEST, this.onSpinRequest.bind(this));
        this._eventBus.on(GameEvents.ALL_REELS_STOPPED, this.onReelsStopped.bind(this));

        // TODO: load stage ? 
        this.loadStage(new BaseGameStage(this._eventBus, this._audioService, this._symbolService));
    }

    public loadStage(stage: IGameStage): void {
        if (this._currStage) {
            this._currStage.onExit();
            this.container.removeChild(this._currStage.getView());
        }

        this._currStage = stage;
        this.container.addChild(this._currStage.getView());
        this._currStage.onEnter(); 
    }

    private onSpinRequest(): void {
        if (this._gameState.isSpinning) return;

        this._gameState.setSpinning(true);
        this._eventBus.emit(GameEvents.SPIN_START);

        this.mockServerResponse();
    }

    private onReelsStopped(): void {
        this._gameState.setSpinning(false);
        // TODO: win system ?
    }

    public getCurrentStage(): IGameStage | null {
        return this._currStage;
    }

    // TODO: move out from here
    private mockServerResponse(): void {
        setTimeout(() => {
            
            if (this._currStage) {
                const machine = this._currStage.getMachine();
                if (machine) {
                    machine.stop();
                }
            }
        }, 2000);
    }
}