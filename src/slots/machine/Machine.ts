import { Container, Graphics } from "pixi.js";
import { IReelSpinSystem } from "../../systems/reelSpinSystem/IReelSpinSystem";
import { IMachine } from "./IMachine";
import { SymbolService } from "../../services/symbolService/SymbolService";
import { EventBus } from "../../utils/EventBus";

export class Machine implements IMachine {
    public readonly container: Container;

    private _reelSpinSystem: IReelSpinSystem;

    constructor(eventBus: EventBus, spinSystem: IReelSpinSystem, symbolService: SymbolService) {
        this.container = new Container();

        this._reelSpinSystem = spinSystem;

        // TODO: create reels

        // TODO: create Mask

        // TODO: init spin system
    }

    public spin(): void {
        // TODO: impl later
    }

    public stop(): Promise<void> {
        // TODO: impl later
        return Promise.resolve();
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
}