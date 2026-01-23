## Road to complete

SELF REMINDER THROUGHOUT PROCESS:
-- DO NOT OVER COMMIT AND TRY TO REFACTOR EVERYTHING AND BRING NEW THINGS !!!


Phase 1:
-- Dont waste time trying to pluggin in new stuff, they will be refactored **
- Move constants, hard-coded stuff to configs - Setup done, need to come back now and then to adjust
- Prepare state: nothing fance, single object state approach - Done
- Prepare eventBus: need this to break free from coupled code -> should allow me to easily get the UI to ok state - EventBus is done. UI is connected to eventBus. 
- update AssetLoader, Add AudioService, SymbolService - SS is done, AudioService is done, delay for now touching the AssetLoader.

Notes: 
-- somewhat in enough state to move forward to Phase 2


Pre Phase 2:
- simple stage manager
- simple BaseGameStage - focus on removal of layout stuff from SlotMachine and stage based spin , win handling ?
- win system, just a dumb random win check
Phase 2:
-- Stage based game ? I think it is easiest to go with for now.
- Create StageManager - done
- Simple BaseGameStage - done, needs machine stuff 
- Simple WinSystem

This should allow me to prepare stage related stuff and remove them from SlotMachine.
Don't go ahead yet with mock server stuff, if have time, add such thing.

Phase 3:
- Refactor Machine
- Refactor Reel: Reel, ReelView, ReelSpinSystem ??
- Remove references of slotMachine from UI.ts


Phase 4:
- move away from PIXI.ticker based spinning, use gsap/anime.js
- add minimum spinning time and config based spinning stuff

Phase 5:
- add tests
- dunno, use maybe vitests ?

Final (potential) polish checklist:
- low - maybe refactor UI a bit so button creation and events are not coupled to it ? 