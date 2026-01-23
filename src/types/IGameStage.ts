import { Container } from "pixi.js";

/**
 * Definition of a game stage
 */
export interface IGameStage {
    //TODO: expose curr stage view ?
    getView(): Container;

    // Any logic for setups while entering stage.
    onEnter(): void;

    // Any logic for setups while exiting stage.
    onExit(): void;
}