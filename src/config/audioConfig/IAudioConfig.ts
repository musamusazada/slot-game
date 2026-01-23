
export enum SOUND_NAMES {
    REEL_SPIN = 'REEL_SPIN',
    WIN = 'WIN',
    SPIN_BUTTON = 'SPIN_BUTTON',
}

type TMappedSoundNames = {
    [key in SOUND_NAMES]: string;
}

// Config type to be type safe with SOUND_NAMES
export type IAudioConfig = TMappedSoundNames;