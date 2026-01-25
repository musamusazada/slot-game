import { Container } from "pixi.js";
import { IMachine } from "../slots/machine/IMachine";

/**
 * Definition of a game stage
 */
export interface IGameStage {
    getView(): Container;

    // Expose existing machine to consumers
    getMachine(): IMachine | null;

    // Any logic for setups while entering stage.
    onEnter(): void;    

    // Any logic for setups while exiting stage.
    onExit(): void;
}