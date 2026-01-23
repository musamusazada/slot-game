import { Container } from "pixi.js";
import { SymbolService } from "../services/symbolService/SymbolService";
import { AudioService } from "../services/audioService/AudioService";
import { GameState } from "../state/GameState";
import { EventBus } from "../utils/EventBus";
import { IGameStage } from "../types/IGameStage";
import { GameEvents } from "../types/GameEvents";

export class StageManager {
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

    private onSpinRequest(): void {
        if (this._gameState.isSpinning) return;

        this._gameState.setSpinning(true);
        this._eventBus.emit(GameEvents.SPIN_START);
    }

    private onReelsStopped(): void {
        // TODO: win system ?
    }
}