import { GameEvents } from "../types/GameEvents";
import { EventBus } from "../utils/EventBus";
import { IGameState, TGameStateData } from "./IGameState";

/**
 * Single object global game state
 */
export class GameState implements IGameState {
    private _isSpinning: boolean = false;
    private _isWin: boolean = false;

    public constructor(private eventBus: EventBus) {}

    public get isSpinning(): boolean {
        return this._isSpinning;
    }

    public get isWin(): boolean {
        return this._isWin;
    }

    public setSpinning(value: boolean): void {
        if (this._isSpinning === value) return;
        this._isSpinning = value;
        this.emitStateChange();
    }

    public setIsWin(value: boolean): void {
        this._isWin = value;
        this.emitStateChange();
    }

    public emitStateChange(): void {
        this.eventBus.emit(GameEvents.STATE_CHANGED, { isSpinning: this._isSpinning } as TGameStateData);
    }
}