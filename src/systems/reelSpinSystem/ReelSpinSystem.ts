import { gsap } from "gsap";
import { GameConfig } from "../../config/gameConfig/GameConfig";
import { TSpinConfig, TSpinProperties } from "../../config/gameConfig/GameConfigTypes";
import { IReel } from "../../slots/reel/types/IReel";
import { IReelSpinSystem } from "./IReelSpinSystem";

export class ReelSpinSystem implements IReelSpinSystem {
    private _reels: IReel[] = [];
    private _spinConfig: TSpinConfig;

    constructor() {
        this._spinConfig = GameConfig.SPIN;
    }
    public init(reels: IReel[]): void {
        // TODO: impl later
        this._reels = reels;
    }

    public startSpin(): void {
        // TODO: impl later
        this._reels.forEach((reel, index) => {
            gsap.delayedCall(index * this._spinConfig.staggerStartDelay , () => this.spinReel(reel));
        })
    }

    public stopSpin(): Promise<void> {
        // TODO: impl later
        return Promise.resolve();
    }

    private spinReel(reel: IReel): void {
        gsap.killTweensOf(reel);

        const { distance, duration } = this.getSpinProperties(reel);

        gsap.to(reel, {
            position: `-=${distance}`,
            duration: duration,
            ease: this._spinConfig.spinEase,
            repeat: -1
        })
    }

    private getSpinProperties(reel: IReel): TSpinProperties {
        const pixelsPerSecond = GameConfig.REELS.symbolsPerSecond * reel.sizeOfSymbol;
        const oneRotationDistance = reel.sizeOfSymbol * reel.symbolsCount;
        const oneRotationDuration = oneRotationDistance / pixelsPerSecond;
        return {
            distance: oneRotationDistance,
            duration: oneRotationDuration
        }
    }
}