import { IGameState } from "./IGameState";

export class GameState implements IGameState {
    private _isSpinning: boolean = false;

    public get isSpinning(): boolean {
        return this._isSpinning;
    }

    public set setSpinning(value: boolean) {
        if (this._isSpinning === value) return;
        this._isSpinning = value;
        this.emitStateChange();
    }

    public emitStateChange(): void {
        // TODO: add emitter, send curr state
    }
}