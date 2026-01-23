import { Container } from "pixi.js";
import { IReelView } from "./types/IReelView";

export class ReelView implements IReelView {
    private readonly _container: Container;

    public constructor() {
        this._container = new Container();
    }

    public getView(): Container {
        return this._container;
    }

    public destroy(): void {
        this._container.destroy({ children: true});
    }
}