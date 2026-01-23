import { utils } from "pixi.js"
import { GameEventMap } from "../types/GameEvents";


/** 
 * EventBus built on top of PIXI's EventEmitter
 * with game specific type safe events
*/
export class EventBus {
    private _emitter: utils.EventEmitter;

    constructor() {
        this._emitter = new utils.EventEmitter();
    }

    public emit<K extends keyof GameEventMap>(event: K, ...args: GameEventMap[K] extends void ? [] : [GameEventMap[K]]): boolean {
        return this._emitter.emit(event, ...args);
    }

    public on<K extends keyof GameEventMap>(event: K, fn: (payload: GameEventMap[K]) => void): void {
        this._emitter.on(event, fn);
    }

    public off<K extends keyof GameEventMap>(event: K, fn: (payload: GameEventMap[K]) => void): void {
        this._emitter.off(event, fn);
    }
}