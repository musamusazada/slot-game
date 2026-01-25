import { Container, Graphics } from "pixi.js";
import { IReelSpinSystem } from "../../systems/reelSpinSystem/IReelSpinSystem";
import { IMachine } from "./IMachine";
import { SymbolService } from "../../services/symbolService/SymbolService";
import { EventBus } from "../../utils/EventBus";
import { GameConfig } from "../../config/gameConfig/GameConfig";
import { Reel } from "../reel/Reel";
import { GameEvents } from "../../types/GameEvents";

export class Machine implements IMachine {
    public readonly container: Container;

    private _reelSpinSystem: IReelSpinSystem;

    private _symbolService: SymbolService;

    private _reels: Reel[] = []

    constructor(eventBus: EventBus, spinSystem: IReelSpinSystem, symbolService: SymbolService) {
        this.container = new Container();

        this._reelSpinSystem = spinSystem;
        this._symbolService = symbolService;

        this.createReels();
        this.createMask();

        this._reelSpinSystem.init(this._reels);

        eventBus.on(GameEvents.SPIN_START, this.spin.bind(this));
    }

    private createReels(): void {
        for (let i = 0; i < GameConfig.REELS.count; i++) {
            const reel = new Reel(GameConfig.REELS.symbolsPerReel, GameConfig.SYMBOLS.size, this._symbolService);
            // stack reels vertically
            reel.getView().y = i * (GameConfig.REELS.height + GameConfig.REELS.spacing);
            this.container.addChild(reel.getView());
            this._reels.push(reel);
        }
    }

    private createMask(): void {
        const mask = new Graphics();
        mask.beginFill(0xFFFFFF);
        mask.drawRect(0, 0, this.width, this.height);
        mask.endFill();
        this.container.addChild(mask);
        this.container.mask = mask;
    }

    public spin(): void {
        // TODO: impl later
        this._reelSpinSystem.startSpin();
    }

    public stop(): Promise<number[]> {
        // TODO: impl later
        return this._reelSpinSystem.stopSpin();
    }

    public getView(): Container {
        return this.container;
    }

    public getMask(): Graphics {
        // TODO: impl later
        return new Graphics();
    }

    public getSpinSystem(): IReelSpinSystem {
        return this._reelSpinSystem;
    }

    /**
     * Get total width of the machine
     */
    public get width(): number {
        return GameConfig.REELS.width;
    }

    /**
     * EACH REEL + SPACING
     * extract last spacing to eleminate extra space at bottom.
    */
    public get height(): number {
        return GameConfig.REELS.count * (GameConfig.REELS.height + GameConfig.REELS.spacing) - GameConfig.REELS.spacing;
    }
}