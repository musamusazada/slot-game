import { Container } from "pixi.js";
import { IReel } from "./types/IReel";
import { ReelView } from "./ReelView";
import { IReelView } from "./types/IReelView";

export class Reel implements IReel {
    private readonly _container: Container;
    private readonly _symbolsCount: number;
    private readonly _view: IReelView;

    public constructor(symbolsCount: number){
        this._symbolsCount = symbolsCount;
        this._view = new ReelView();
        this._container = this._view.getView();
    }

    public get symbolsCount(): number {
        return this._symbolsCount;
    }

    public getView(): Container {
        return this._container;
    }
}