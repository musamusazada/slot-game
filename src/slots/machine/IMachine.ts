import { Container, Graphics } from "pixi.js";
import { IReelSpinSystem } from "../../systems/reelSpinSystem/IReelSpinSystem";

export interface IMachine {
    // start spinning all reels
    spin(): void;

    // stop spinning all reels
    stop(): Promise<void>;

    // get machine view container
    getView(): Container;

    // get machine mask
    getMask(): Graphics;

    // get reel spin system
    getSpinSystem(): IReelSpinSystem;
}