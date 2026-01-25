import { TGameStateData } from "../state/IGameState";

// TODO: should be sufficient for covering the template, check at the end.
export enum GameEvents {
    SPIN_REQUEST = 'SPIN_REQUEST',
    SPIN_START = 'SPIN_START',
    REEL_SPIN_START = 'REEL_SPIN_START',
    REEL_STOP = 'REEL_STOP',
    ALL_REELS_STOPPED = 'ALL_REELS_STOPPED',
    STATE_CHANGED = 'STATE_CHANGED',
    WIN_CHECK_COMPLETE = 'WIN_CHECK_COMPLETE'
}

// Typed map for events, void for no-payload events
// TODO: type payloads
export type GameEventMap = {
    [GameEvents.SPIN_REQUEST]: void;
    [GameEvents.SPIN_START]: void;
    [GameEvents.REEL_SPIN_START]: { reelIndex: number };
    [GameEvents.REEL_STOP]: { reelIndex: number };
    [GameEvents.ALL_REELS_STOPPED]: number[];
    [GameEvents.STATE_CHANGED]: TGameStateData;
    [GameEvents.WIN_CHECK_COMPLETE]: WinCheckPayload;
};

export interface WinCheckPayload {
    isWin: boolean;
}