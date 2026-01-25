export interface IGameConfig {
    SCREEN: {
        width: number;
        height: number;
        bgColor: number;
    },
    SYMBOLS: {
        size: number;
    }
    REELS: TReelsConfig,
    SPIN: TSpinConfig,
    UI: {
        SPIN_BUTTON:{
            width: number,
            height: number
        }
    }
    SOUND: {
        DEFAULT_VOLUME: number;
    }
}

// TODO: Come back later during spinning implementation
export type TSpinConfig = {
    minimumSpinTime: number;
    accelerationDuration: number;
    stopDuration: number;
    staggerStartDelay: number;
    staggerStopDelay: number;
    spinEase: string;
    stopEase: string;
}

export type TReelsConfig = {
    count: number;
    symbolsPerReel: number;
    symbolsPerSecond: number;
    spacing: number; 
    width: number;
    height: number;
}

export type TSpinProperties = {
    distance: number,
    duration: number
}