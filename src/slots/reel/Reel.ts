import { Container } from "pixi.js";
import { IReel } from "./types/IReel";
import { ReelView } from "./ReelView";
import { IReelView } from "./types/IReelView";
import { SymbolService } from "../../services/symbolService/SymbolService";

export class Reel implements IReel {
    private readonly _container: Container;
    private readonly _symbolsCount: number;
    private readonly _symbolSize: number;
    private _symbolIds: number[] = [];
    private readonly _view: IReelView;

    private readonly _symbolService: SymbolService;

    public constructor(symbolsCount: number, symbolSize: number, symbolService: SymbolService){
        this._symbolsCount = symbolsCount;
        this._symbolSize = symbolSize;
        this._symbolService = symbolService;

        this.initData();

        this._view = new ReelView(this._symbolsCount, this._symbolSize, this._symbolService, this._symbolIds);
        this._container = this._view.getView();

    }

    private initData(): void {
        for (let i = 0; i < this._symbolsCount; i++) {
            const symbol = this._symbolService.getRandomSymbolId();
            this._symbolIds.push(symbol);
        }
    }

    public get symbolsCount(): number {
        return this._symbolsCount;
    }

    public getView(): Container {
        return this._container;
    }
}