import { Container } from "pixi.js";
import { IReel } from "./types/IReel";
import { ReelView } from "./ReelView";
import { IReelView } from "./types/IReelView";
import { SymbolService } from "../../services/symbolService/SymbolService";


/**
 * Reel logic class
 * Used in conbination with ReelView to handle visuals.
 */
export class Reel implements IReel {
    private readonly _container: Container;
    // Initial Reel position.
    private _position: number = 0;
    private readonly _symbolsCount: number;
    private readonly _symbolSize: number;
    // Extra symbol needed for spinning - to handle swaps of symbols out of visible area.
    private readonly _bufferSymbolCount: number = 1;
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
        this._view.update(this._position);
    }

    private initData(): void {
        const totalSymbols = this._symbolsCount + this._bufferSymbolCount;
        for (let i = 0; i < totalSymbols; i++) {
            const symbol = this._symbolService.getRandomSymbolId();
            this._symbolIds.push(symbol);
        }
    }

    public getVisibleSymbols(): number[] {
        return this._symbolIds; 
    }

    public get position(): number {
        return this._position;
    }

    public set position(value: number) {
        this._position = value;
        this._view.update(this._position);
    }

    public get symbolsCount(): number {
        return this._symbolsCount;
    }

    public get sizeOfSymbol(): number {
        return this._symbolSize;
    }

    public getView(): Container {
        return this._container;
    }
}