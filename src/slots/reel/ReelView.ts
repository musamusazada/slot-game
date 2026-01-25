import { Container, Sprite } from "pixi.js";
import { IReelView } from "./types/IReelView";
import { SymbolService } from "../../services/symbolService/SymbolService";

export class ReelView implements IReelView {
    private readonly _container: Container;
    private _symbolSprites: Sprite[] = [];
    private _symbolIds: number[] = [];

    public constructor(private symbolCount: number, private symbolSize:number, private _symbolService: SymbolService, symbolIds: number[]) {
        this._container = new Container(); 
        // store copy of the original
        this._symbolIds = [...symbolIds];

        this.initSymbols();
    }   

    private initSymbols(): void {
        for (let i = 0; i < this.symbolCount; i++) {
            const id = this._symbolIds[i];
            // Use pooled sprite from SymbolService
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
            const calculatedPositionX = position + offset;
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