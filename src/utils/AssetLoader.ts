import * as PIXI from 'pixi.js';
import { ISkeletonData } from '@pixi-spine/base';
import { SymbolConfig } from '../config/symbols/SymbolsConfig';
import { TextureNames } from '../config/assetNames/TextureNames';

interface SpineAsset {
    spineData: ISkeletonData;
}

// Asset paths
const IMAGES_PATH = 'assets/images/';
const SPINES_PATH = 'assets/spines/';

// Asset lists
const UI_IMAGES = [
    TextureNames.BUTTON_SPIN,
    TextureNames.BUTTON_SPIN_DISABLED,
];

const IMAGES = [
    ...SymbolConfig.map(symbol => symbol.texture),
    ...UI_IMAGES
];

const SPINES = [
    'big-boom-h.json',
    'base-feature-frame.json'
];

const textureCache: Record<string, PIXI.Texture> = {};
const spineCache: Record<string, SpineAsset> = {};

export class AssetLoader {
    constructor() {
        PIXI.Assets.init({ basePath: '' });
    }

    public async loadAssets(): Promise<void> {
        try {
            PIXI.Assets.addBundle('images', IMAGES.map(image => ({
                name: image,
                srcs: IMAGES_PATH + image
            })));

            PIXI.Assets.addBundle('spines', SPINES.map(spine => ({
                name: spine,
                srcs: SPINES_PATH + spine
            })));

            const imageAssets = await PIXI.Assets.loadBundle('images');
            console.log('Images loaded successfully');

            for (const [key, texture] of Object.entries(imageAssets)) {
                textureCache[key] = texture as PIXI.Texture;
            }

            try {
                const spineAssets = await PIXI.Assets.loadBundle('spines');
                console.log('Spine animations loaded successfully');

                for (const [key, spine] of Object.entries(spineAssets)) {
                    spineCache[key] = spine as SpineAsset;
                }
            } catch (error) {
                console.error('Error loading spine animations:', error);
            }

            console.log('Assets loaded successfully');
        } catch (error) {
            console.error('Error loading assets:', error);
            throw error;
        }
    }

    public static getTexture(name: string): PIXI.Texture {
        return textureCache[name];
    }

    public static getSpine(name: string): SpineAsset | undefined {
        return spineCache[name];
    }
}
