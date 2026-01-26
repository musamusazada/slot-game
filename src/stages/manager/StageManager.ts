import { Container } from "pixi.js";
import { SymbolService } from "../../services/symbolService/SymbolService";
import { AudioService } from "../../services/audioService/AudioService";
import { GameState } from "../../state/GameState";
import { EventBus } from "../../utils/EventBus";
import { IGameStage } from "../../types/IGameStage";
import { GameEvents } from "../../types/GameEvents";
import { IStageManager } from "./IStageManager";
import { BaseGameStage } from "../gameStages/BaseGameStage";
import { WinSystem } from "../../systems/win/WinSystem";
import { SOUND_NAMES } from "../../config/audioConfig/IAudioConfig";

export class StageManager implements IStageManager {
    public container: Container;

    private _currStage: IGameStage | null = null;

    private _winSystem: WinSystem;

    constructor(
        private _eventBus: EventBus,
        private _gameState: GameState,
        private _audioService: AudioService,
        private _symbolService: SymbolService
    ) {
        this.container = new Container();

        this._winSystem = new WinSystem(this._eventBus, this._gameState);

        this._eventBus.on(GameEvents.SPIN_REQUEST, this.onSpinRequest.bind(this));
        this._eventBus.on(GameEvents.ALL_REELS_STOPPED, this.onReelsStopped.bind(this));
        this._eventBus.on(GameEvents.WIN_CHECK_COMPLETE, this.onWinCheckComplete.bind(this));

        this.loadStage(new BaseGameStage(this._eventBus, this._audioService, this._symbolService));
    }

    public loadStage(stage: IGameStage): void {
        if (this._currStage) {
            this._currStage.onExit();
            this.container.removeChild(this._currStage.getView());
        }

        this._currStage = stage;
        this.container.addChild(this._currStage.getView());
        this._currStage.onEnter(); 
    }

    private onSpinRequest(): void {
        if (this._gameState.isSpinning) return;

        this._gameState.setSpinning(true);
        this._eventBus.emit(GameEvents.SPIN_START);

        this.mockServerResponse();
    }

    private onReelsStopped(): void {
        this._winSystem.checkWin();
        this._gameState.setSpinning(false);
    }

    private onWinCheckComplete(): void {
        this._audioService.play(SOUND_NAMES.WIN);
    }

    public getCurrentStage(): IGameStage | null {
        return this._currStage;
    }

    // TODO: move out from here
    private mockServerResponse(): void {
        setTimeout(() => {
            
            if (this._currStage) {
                const machine = this._currStage.getMachine();
                if (machine) {
                    machine.stop();
                }
            }
        }, 2000);
    }
}