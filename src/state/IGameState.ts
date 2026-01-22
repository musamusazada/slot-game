export interface IGameState {
    isSpinning: boolean;
    emitStateChange(): void;
}