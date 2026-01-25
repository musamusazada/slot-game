import { Container, Sprite } from "pixi.js";
import { IReelView } from "./types/IReelView";
import { SymbolService } from "../../services/symbolService/SymbolService";

export class ReelView implements IReelView {
    private readonly _container: Container;
    private _symbolSprites: Sprite[] = [];
    private _symbolIds: number[] = [];
    // Extra symbol needed for spinning - to handle swaps of symbols out of visible area.
    private readonly _bufferSymbolCount: number = 1;
    private _totalWidth: number;
    private _visibleWidth: number;

    public constructor(private symbolCount: number, private symbolSize:number, private _symbolService: SymbolService, symbolIds: number[]) {
        this._container = new Container(); 
        // copy the original symbols
        this._symbolIds = [...symbolIds];

        this._totalWidth = (this.symbolCount + 1 ) * this.symbolSize;
        this._visibleWidth = (this.symbolCount) * this.symbolSize;

        this.initSymbols();
    }   

    private initSymbols(): void {
        const totalSymbols = this.symbolCount + this._bufferSymbolCount;
        for (let i = 0; i < totalSymbols; i++) {
            const id = this._symbolIds[i];
            const texture = this._symbolService.getSymbolTextureById(id);
            const sprite = new Sprite(texture);

            sprite.width = this.symbolSize;
            sprite.height = this.symbolSize;
            
            this._container.addChild(sprite);
            this._symbolSprites.push(sprite);
        }
    }

    public update(position: number): void {
        for (let i = 0; i < this._symbolSprites.length; i++){
            const sprite = this._symbolSprites[i];
            const offset = i * this.symbolSize;
             // Makes sure that the position doesn't exceed the totalWidth
            let calculatedPositionX = ((position + offset) % this._totalWidth + this._totalWidth) % this._totalWidth;
            
            // Left to right transition handling
            if (calculatedPositionX > this._visibleWidth) {
                calculatedPositionX -= this._totalWidth;
            }
            
            sprite.x = calculatedPositionX;
        }
    }

    public getView(): Container {
        return this._container;
    }

    public destroy(): void {
        this._container.destroy({ children: true});
    }
}