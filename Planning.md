## Road to complete

SELF REMINDER THROUGHOUT PROCESS:
-- DO NOT OVER COMMIT AND TRY TO REFACTOR EVERYTHING AND BRING NEW THINGS !!!


Phase 1:
-- Dont waste time trying to pluggin in new stuff, they will be refactored **
- Move constants, hard-coded stuff to configs - Setup done, need to come back now and then to adjust
- Prepare state: nothing fance, single object state approach - Done
- Prepare eventBus: need this to break free from coupled code
- update AssetLoader, Add AudioService, SymbolService

-- Done


Phase 2:
-- Stage based game ? I think it is easiest to go with for now.
- Create StageManager - done
- Simple BaseGameStage - done, needs machine stuff 
- Simple WinSystem

-- Done

Phase 3:
- Refactor Machine
- Refactor Reel: Reel, ReelView, ReelSpinSystem ??
- Remove references of slotMachine from UI.ts

-- Done

Phase 4:
- move away from PIXI.ticker based spinning, use gsap/anime.js
- add minimum spinning time and config based spinning stuff

-- Done

Phase 5:
- add tests
- dunno, use maybe vitests ?

-- Couldn't start P5. skipped.

Final (potential) polish checklist:
- low - maybe refactor UI a bit so button creation and events are not coupled to it ? 
- low - dynamic reels depending on the symbol count : centered symbols, not just aligned to left. it should give better experience for changing config for reel symbol count ?