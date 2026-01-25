import { Container, Graphics } from "pixi.js";
import { EventBus } from "../../utils/EventBus";
import { AudioService } from "../../services/audioService/AudioService";
import { SymbolService } from "../../services/symbolService/SymbolService";
import { IGameStage } from "../../types/IGameStage";
import { GameEvents } from "../../types/GameEvents";
import { GameConfig } from "../../config/gameConfig/GameConfig";
import { AssetLoader } from "../../utils/AssetLoader";
import { Spine } from "pixi-spine";
import { SOUND_NAMES } from "../../config/audioConfig/IAudioConfig";
import { ReelSpinSystem } from "../../systems/reelSpinSystem/ReelSpinSystem";
import { Machine } from "../../slots/machine/Machine";
import { IMachine } from "../../slots/machine/IMachine";


export class BaseGameStage implements IGameStage {
    public container: Container;

    private _machine: Machine;
    private _frameSpine: Spine | null = null;

    constructor(
        private _eventBus: EventBus,
        private _audioService: AudioService,
        private _symbolService: SymbolService,
    ){
        this.container = new Container();

        // TODO: machine setup stuff
        const reelSpinSystem = new ReelSpinSystem(this._eventBus);
        this._machine = new Machine(this._eventBus, reelSpinSystem, this._symbolService);

        this.createBackground();
        this.setupFrameSpine();
        this.setupMachineView();

        this._eventBus.on(GameEvents.SPIN_START, this.onSpinStart.bind(this));
        this._eventBus.on(GameEvents.ALL_REELS_STOPPED, this.onAllReelsStopped.bind(this));
    }

    public getView(): Container {
        return this.container;
    }

    // Stage states
    public onEnter(): void {
        // TODO: setup ?
    }

    public onExit(): void{
        this._eventBus.off(GameEvents.SPIN_START, this.onSpinStart.bind(this));
        this._eventBus.off(GameEvents.ALL_REELS_STOPPED, this.onAllReelsStopped.bind(this));

        this._audioService.dispose();
        this.container.destroy({ children: true });
    }

    // TODO: for now it is fine but if have time, separate the visuals ?
    // Visual setups
    private createBackground(): void{
        const bg = new Graphics();
        bg.beginFill(0x000000, 0.5);
        bg.drawRect(0, 0, GameConfig.SCREEN.width, GameConfig.SCREEN.height);
        bg.endFill();
        this.container.addChild(bg);
    }

    private setupFrameSpine(): void {
        // TODO: no string access pls
        const frameSpineData = AssetLoader.getSpine('base-feature-frame.json')
        if (frameSpineData) {
            this._frameSpine = new Spine(frameSpineData.spineData);
            this._frameSpine.position.set(GameConfig.SCREEN.width / 2, GameConfig.SCREEN.height / 2);
            if (this._frameSpine.state.hasAnimation('idle')){
                this._frameSpine.state.setAnimation(0, 'idle', true);
            }
            this.container.addChild(this._frameSpine);
            
        }
    }

    private setupMachineView(): void {
        const machineView = this._machine.getView();
        machineView.position.x = ( GameConfig.SCREEN.width - this._machine.width ) / 2;
        machineView.position.y = ( GameConfig.SCREEN.height - this._machine.height ) / 2;
        this.container.addChild(machineView);
    }

    private onSpinStart(): void {
        this._audioService.play(SOUND_NAMES.REEL_SPIN)
    }

    private onAllReelsStopped(): void {
        this._audioService.stop(SOUND_NAMES.REEL_SPIN)
    }

    public getMachine(): IMachine | null {
        return this._machine;
    }
}