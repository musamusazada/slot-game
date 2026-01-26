import { gsap } from "gsap";
import { GameConfig } from "../../config/gameConfig/GameConfig";
import { TSpinConfig, TSpinProperties } from "../../config/gameConfig/GameConfigTypes";
import { IReel } from "../../slots/reel/types/IReel";
import { IReelSpinSystem } from "./IReelSpinSystem";
import { GSAPUtils } from "../../utils/GSAPUtils";
import { GameEvents } from "../../types/GameEvents";
import { EventBus } from "../../utils/EventBus";


/**
 * SpinSystem class
 * Built on top of gsap to provide spinning support for Machine
 */
export class ReelSpinSystem implements IReelSpinSystem {
    private _reels: IReel[] = [];
    private _spinConfig: TSpinConfig;
    private _spinStartTime: number = 0;

    constructor(private _eventBus: EventBus) {
        this._spinConfig = GameConfig.SPIN;
    }
    public init(reels: IReel[]): void {
        this._reels = reels;
    }

    public startSpin(): void {
        this._spinStartTime = Date.now();
        this._reels.forEach((reel, index) => {
            gsap.delayedCall(index * this._spinConfig.staggerStartDelay , () => this.spinReel(reel));
        })
    }

    public async stopSpin(): Promise<number[]> {
       const remainingMinTime = this.getRemainingMinSpinTime();
        
        // wait for minimum spin time
        if (remainingMinTime > 0) {
            await GSAPUtils.delay(remainingMinTime);
        }

        const promises = this._reels.map((reel, index) => {
            return new Promise<void>(resolve => {
                gsap.delayedCall(index * this._spinConfig.staggerStopDelay, () => {
                    this.stopReel(reel).then(() => {
                        resolve();
                    });
                });
            });
        });

        await Promise.all(promises);

        // Collect results
        const results = this._reels.map(r => r.getVisibleSymbols()[0]);
        
        this._eventBus.emit(GameEvents.ALL_REELS_STOPPED, results);
        
        return results; 
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

    private stopReel(reel: IReel): Promise<void> {
        return new Promise((resolve) => {
            const { distance } = this.getSpinProperties(reel);
            
            // Calculate target position to snap to grid
            const targetPos = Math.floor((reel.position - distance) / reel.sizeOfSymbol) * reel.sizeOfSymbol;
            
            gsap.killTweensOf(reel);
            
            gsap.to(reel, {
                position: targetPos,
                duration: this._spinConfig.stopDuration, 
                ease: this._spinConfig.stopEase,
                onComplete: () => {
                    resolve();
                }
            });
        });
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

    private getRemainingMinSpinTime(): number {
        const elapsed = Date.now() - this._spinStartTime;
        return Math.max(0, this._spinConfig.minimumSpinTime - elapsed);
    }
}