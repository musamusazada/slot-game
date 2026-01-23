// State class interface
export interface IGameState {
    readonly isSpinning: boolean;

    setSpinning(value: boolean): void;
    emitStateChange(): void;
}

// State data type
export type TGameStateData = {
    isSpinning: boolean;
}