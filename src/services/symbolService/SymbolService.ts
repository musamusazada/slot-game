import { ISymbolService } from "./ISymbolService";
import { AssetLoader } from "../../utils/AssetLoader";
import { ISymbolConfig } from "../../config/symbols/ISymbolConfig";
import { SymbolConfig } from "../../config/symbols/SymbolsConfig";
import { Texture } from "@pixi/core";


/**
 * SymbolService class to provide symbol util methods
 */
export class SymbolService implements ISymbolService {
    private _symbolsMap: Map<number, ISymbolConfig> = new Map();

    public constructor() {
        this.loadSymbolDefs(SymbolConfig)
    }

    // Sets up symbols from config
    private loadSymbolDefs(symbols: ISymbolConfig[]): void {
        this._symbolsMap.clear();
        symbols.forEach(symbol => {
            this._symbolsMap.set(symbol.id, symbol);
        });
    }

    public getSymbolTextureById(id: number): Texture {
        const symbol = this._symbolsMap.get(id);
        if (!symbol) throw new Error(`Symbol with id ${id} not found`);

        return AssetLoader.getTexture(symbol.texture);
    }

    public getSymbolConfigById(id: number): ISymbolConfig {
        const symbol = this._symbolsMap.get(id);
        if (!symbol) throw new Error(`Symbol with id ${id} not found`);

        return symbol;
    }

    public getRandomSymbolId(): number {
       return Math.floor(Math.random() * this._symbolsMap.size);
    }
}