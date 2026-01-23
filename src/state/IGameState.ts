// State class interface
export interface IGameState {
    readonly isSpinning: boolean;
    readonly isWin: boolean;

    setIsWin(value: boolean): void;
    setSpinning(value: boolean): void;
    emitStateChange(): void;
}

// State data type
export type TGameStateData = {
    isSpinning: boolean;
    isWin: boolean;
}