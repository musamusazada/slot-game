import { IReel } from "../../slots/reel/types/IReel";
import { IReelSpinSystem } from "./IReelSpinSystem";

export class ReelSpinSystem implements IReelSpinSystem {
    public init(reels: IReel[]): void {
        // TODO: impl later
    }

    public startSpin(): void {
        // TODO: impl later
    }

    public stopSpin(): Promise<void> {
        // TODO: impl later
        return Promise.resolve();
    }
}