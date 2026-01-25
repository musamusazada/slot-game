import { Container } from "pixi.js";

export interface IReel {
    // Virtual reel position.
    position: number;
    sizeOfSymbol: number;
    symbolsCount: number;
    getVisibleSymbols(): number[];
    getView(): Container;
}