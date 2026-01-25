import { IGameConfig } from './GameConfigTypes';

export const GameConfig: IGameConfig = {
    SCREEN: {
        width: 1280,
        height: 800,
        bgColor: 0x1099bb, // light blue
    },
    REELS: {
        count: 4,
        symbolsPerReel: 6,
        spacing: 10,
        height: 150,
        symbolsPerSecond: 20,
        // TODO: adjust maybe so it includes the any spacing ?
        width: 150 * 6, // 900, for 6 column setup
    },
    SYMBOLS: {
        size: 150,
    },
    // TODO: add descriptive comments when implementing spinning
    SPIN: {
        minimumSpinTime: 2,
        spinningSpeed: 1,
        stopDuration: 2,
        staggerStartDelay: 0.2,
        staggerStopDelay: 0.2,
        //TODO: adjust the values when implementing spinning
        spinEase: 'none',
        stopEase: 'none',
    },
    UI: {
        SPIN_BUTTON: {
            width: 150,
            height: 80,
        }
    },
    SOUND: {
        DEFAULT_VOLUME: 0.5
    }
};