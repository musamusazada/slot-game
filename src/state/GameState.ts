import { GameEvents } from "../types/GameEvents";
import { EventBus } from "../utils/EventBus";
import { IGameState, TGameStateData } from "./IGameState";

export class GameState implements IGameState {
    private _isSpinning: boolean = false;

    public constructor(private eventBus: EventBus) {}

    public get isSpinning(): boolean {
        return this._isSpinning;
    }

    public setSpinning(value: boolean): void {
        if (this._isSpinning === value) return;
        this._isSpinning = value;
        this.emitStateChange();
    }

    public emitStateChange(): void {
        this.eventBus.emit(GameEvents.STATE_CHANGED, { isSpinning: this._isSpinning } as TGameStateData);
    }
}