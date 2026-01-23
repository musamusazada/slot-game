import { Container } from "pixi.js";

export interface IReelView {
    getView(): Container;
    destroy(): void;
}