export interface IAudioService {
    loadSounds(): Promise<void>;
    play(alias: string, loop?: boolean): void;
    stop(alias: string): void;
    stopAll(): void;
}