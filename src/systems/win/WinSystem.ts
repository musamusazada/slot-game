import { IGameState } from "../../state/IGameState";
import { GameEvents } from "../../types/GameEvents";
import { EventBus } from "../../utils/EventBus";
import { IWinSystem } from "./IWinSystem";

/**
 * Simple WinSystem based on random chance.
 */
export class WinSystem implements IWinSystem{
    public constructor(private _eventBus: EventBus, private _gameState: IGameState) {}

    public checkWin(): void {
        const isWin = Math.random() < 0.5;

        this._gameState.setIsWin(isWin);
        this._eventBus.emit(GameEvents.WIN_CHECK_COMPLETE, { isWin})
    }
}