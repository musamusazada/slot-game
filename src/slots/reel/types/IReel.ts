import { Container } from "pixi.js";

export interface IReel {
    readonly symbolsCount: number;

    getView(): Container;
}