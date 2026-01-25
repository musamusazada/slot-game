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

export type TSpinConfig = {
    // Controls how long we spin before resolving. Excluded from potential server requests.
    minimumSpinTime: number;
    // Modifier to play around with to increase/decrease spin speed
    spinningSpeed: number;
    // Duration of stop animation
    stopDuration: number;
    // Delay per reel before spin starts
    staggerStartDelay: number;
    // Delay per reel before spin stops
    staggerStopDelay: number;
    spinEase: string;
    stopEase: string;
}

export type TReelsConfig = {
    count: number;
    symbolsPerReel: number;
    // Used for spin speed calculations. Play around to modify fps for symbols during spin.
    symbolsPerSecond: number;
    // Spacing between reels
    spacing: number; 
    width: number;
    height: number;
}

// 
export type TSpinProperties = {
    // How far we move the reel position
    distance: number,
    // Duration of the spin
    duration: number
}