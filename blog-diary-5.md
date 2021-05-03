## Cleanup

There's a bunch of small things that need to be cleaned up in here:

- Path Values are any variety of stuff, it needs to be made consistent.

## Where Did We Land?

Ok, so I've gotten through the weekend. What have I learned/accomplished?

### A Lot of Typescript Finnicking

I think Xstate is great, I also think Typescript is great. I found the errors that Typescript threw because of incorrect setup were some of the most inpenetrable garbage I've seen in a while. The number of generics and vague extensions meant that when things went wrong, it was pretty challenging to dig them back out for me.

### Functioning Game

The game functiosn now, and drives to an endstate, WHEEEEEE!
This is great. I feel like I've learned about as much as I'm going to learn from building this game, and now it's time to actually ship it.

### What Comes Next

There are three (well 4) big portions of work remaining that I'd like to clean up.

1. Get the share state working. This ended up being a bit more complex than I imagined as it will require me to figure out how to render modals, maybe.
2. Add tests. Ooof, I let this get out of hand. I have old tests for the gameState code, but nothing recent, and nothing for **any** of the components I made. Gotta test all those game states, side effects, and renders.
3. Woof does this game look bad. Gotta update it.
4. Clean up the documentation and write a small article about what I'm trying to do here. (Oh also organize the directories)
