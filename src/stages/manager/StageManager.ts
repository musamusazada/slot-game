import { Container } from "pixi.js";
import { SymbolService } from "../services/symbolService/SymbolService";
import { AudioService } from "../services/audioService/AudioService";
import { GameState } from "../state/GameState";
import { EventBus } from "../utils/EventBus";
import { IGameStage } from "../types/IGameStage";
import { GameEvents } from "../types/GameEvents";
import { IStageManager } from "./manager/IStageManager";

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
    }

    public loadStage(stage: IGameStage): void {
        // TODO: impl later when i have sample base game stage
    }

    private onSpinRequest(): void {
        if (this._gameState.isSpinning) return;

        this._gameState.setSpinning(true);
        this._eventBus.emit(GameEvents.SPIN_START);
    }

    private onReelsStopped(): void {
        // TODO: win system ?
    }

    public getCurrentStage(): IGameStage | null {
        return this._currStage;
    }
}