import { Howl , Howler} from 'howler';
import { IAudioConfig } from '../../config/audioConfig/IAudioConfig';
import { GameConfig } from '../../config/gameConfig/GameConfig';

/**
 * AudioService to provide:
 * loading, disposing and playing of sounds.
 */
export class AudioService {
    private _sounds: Map<string, Howl> = new Map();
    private readonly _config: IAudioConfig;
    
    public constructor(config: IAudioConfig) {
        this._config = config;
    }

    public async loadSounds(): Promise<void> {
        const loadPromises: Promise<void>[] = [];
        Object.entries(this._config).forEach(([alias, path]) => {
            const sound = new Howl({
                src: [path],
                volume: GameConfig.SOUND.DEFAULT_VOLUME,
                preload: true
            });
            this._sounds.set(alias, sound);

            if(sound.state() === 'loaded') return;

            const loadPromise = new Promise<void>((resolve) => {
                sound.once('load', ()=> {
                    resolve();
                })
                sound.once('loaderror', (_, err) => {
                    console.error(`Error loading sound "${alias}"`, err);
                })
            });
            loadPromises.push(loadPromise);
        });

        await Promise.all(loadPromises);
    }

    public play(alias: string, loop: boolean = false): void {
        const sound = this._sounds.get(alias);
        if (sound) {
            sound.loop(loop);
            sound.play();
        } else {
            throw new Error(`Sound with alias "${alias}" not found.`);
        }
    }

    public stop(alias: string): void {
        const sound = this._sounds.get(alias)
        if (sound) {
            sound.stop();
        } else {
            throw new Error(`Sound with alias "${alias}" not found.`);
        }
    }

    // Prolly won't use it but just in case if I add inactive tab handling ? 
    public stopAll(): void {
        Howler.stop();
    }

    public dispose(): void {
        this._sounds.forEach((sound) => {
            sound.stop();
            sound.unload();
        });
        this._sounds.clear();
    }
}