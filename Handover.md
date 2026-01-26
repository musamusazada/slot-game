Hello, reviewer(s).

This is a handover document for the assignment. Where I will be talking about the structure a little bit.

There is Planning.md file which I tried to actively use to give you more insight on how am I going from start to finish. You can check its git history to get some vision of my thought process.



## Top to Bottom nodes of game

-- Game.ts - inits services, state, eventBus and StageManager
-- StageManager - handles potential stage handling. We have only one: BaseGame.
-- BaseGameStage - setsup base game view and its elements - Machine, SpinSystem, Background, Spines - frame and win
-- Machine - handles reels, masking and uses spin system to control spinning.
-- SpinSystem - handles spin logic (animation side).
-- Reel - consists of logic component (Reel) and visual component (ReelView).

----------

## Systems:
-- ReelSpinSystem - gsap based spinning system
-- WinSystem - dumb win check based on random chance.

## Services:
-- SymbolService, AudioService

## State:
-- GameState - single object state

## Events:
-- EventBus - custom version of pixi EventEmitter

## UI:
-- separated container based on events.

## GameConfig:
-- big config file for game layout, reel and spin configurations.


My review:
Not fully happy, I needed to rush a bit, had to skip tests, not very happy with Stage (too coupled, but was easiest way to setup. Not good fit atm to grow on top of this), somewhat happy with Machine, ReelSpinSystem, but Reel could have been more generic it is tightly coupled to horizontal spinning. 

Not sure if assignment was really pushing participants to use pixi.ticker for spinning, but to gain insane amount of time, I used gsap. Tried to use gsap for any rendering related things.

Events are good but could have been better - more gathered around Stage would make it much clean.

UI - didn't touch much but it at least just works with events and don't have to touch it anymore.

AssetLoader - Would have been better with pooling, proper management of assets etc.

I think this assignment turned more into cleaning up template and structurizing it rather than planning and implementing a nice architecture for a slot game.

I hope you will easily navigate around the repository.