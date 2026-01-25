import { IReel } from "../../slots/reel/types/IReel";

export interface IReelSpinSystem {
    init(reels: IReel[]): void;
    startSpin(): void;
    stopSpin(): Promise<number[]>;
}