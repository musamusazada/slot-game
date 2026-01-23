import { Texture } from "pixi.js";
import { ISymbolConfig } from "../../config/symbols/ISymbolConfig";

export interface ISymbolService {
    getSymbolTextureById(id: number): Texture
    getSymbolConfigById(id: number): ISymbolConfig; 
    getRandomSymbolId(): number
}