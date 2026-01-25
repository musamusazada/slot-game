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

- Added some boilerplate for Machine, Reel, ReelView and RSS.
Next: 
* do some glue up, achieve a rendered machine in game. - DONE. In general check positioning stuff.
- Mask and UI visual issue is fixed: Positioned mask (x,y) same as machine container (x,y).
- Next up: position symbols on reels properly.
    -- RSS, Reel, ReelView responsibility distributions:
       initial road: track position of reel, and expose it
       -- ReelView: expose a method to work on top of this position ? and align symbols 
       -- RSS: for anim, target the position in Reel so it can pass it to ReelView to update ?
       Have some spinning going on, need to add symbol pos rearranging during spin. Once spinning is ok can move to stop
       - Simple positioning in place. Tested also changing reel symbols count , maybe later add possibility of centering symbols ? So machine looks nice if I change config ?
* start spinning logic - seems like phase 4 will be blended here a bit.
* test how it all plays along

Phase 4:
- move away from PIXI.ticker based spinning, use gsap/anime.js
- add minimum spinning time and config based spinning stuff

Phase 5:
- add tests
- dunno, use maybe vitests ?

Final (potential) polish checklist:
- low - maybe refactor UI a bit so button creation and events are not coupled to it ? 
- low - dynamic reels depending on the symbol count : centered symbols, not just aligned to left. it should give better experience for changing config for reel symbol count ?