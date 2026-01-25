import { Container } from "pixi.js";

export interface IReelView {
    getView(): Container;
    update(position: number): void;
    destroy(): void;
}