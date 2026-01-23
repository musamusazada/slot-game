import { Container } from "pixi.js";
import { IGameStage } from "../types/IGameStage";

/**
 * Definition of simple stage manager 
 * Handles switching between game stages
 */
export interface IStageManager {
    // View container containing stages
    container: Container;
    
    // Load new stage 
    loadStage(stage: IGameStage): void;
    
    // Get current stage
    getCurrentStage(): IGameStage | null;
}