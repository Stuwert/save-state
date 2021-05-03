## Day 3 -> Wiring into React

It's kinda neat that I can just let the error bubble all the way out.

```
      /**
       * Ok so for the erroring functionality, my options are either:
       *
       * 1. Use done and let it swallow the error, basically breaking the functionality
       * of doing any error checking if the move is valid (it would swallow it).
       * 2. Don't use don't and explicitly bubbled back up the action to the parent
       * to take the next turn.
       */
```

I assumed going in that I would have to rethrow the error, but the updates made with a recent version change to Xstate meant that I could let it bubble all the way out.

This made error testing **really** easy, and also meant I could eliminate a lot of test code and a lot of state machine code so I wouldn't have to maintain it.

## What I'm Learning

- I don't need to go through the parent, I can access the child in the form of an actor.

## What I don't know

It seems like it's possible to send the state directly to the child machine via the `useActor` hook, but based on how I'm doing this, it seems fine to allow the parentMachine to orchestrate the actions.

I could see a later, more complex iteration where this isn't the case
and we do in fact want to communicate to the child directly.

However, I think I would need to do something like `useEffect` or
`useActor` (more effectively... lol) to actually manage that transition.

## Tailwind CSS

The opacity effect on the background is absolutely awesome.

## Next Steps

- Figure out how history works and see how I can play and replace the state of the machine
- Based on perusing the docs it actually seems like they yset this up pretty well for us, so it's just a matter of figuring out how to:

1. abstract it out as a full sequence during the share mode
2. Load it back in
3. Attach it to the url.
4. Can I go backwards and forwards?

There's a bit of a risk here in the sense that because the machine doesn't accept a "who" value, it's assuming the sequence of turns is "ok".

### Potential error states

1. Trying to hit the same machine twice
2. trying to continue to play when the game has ended (this is probably more simply accomplished with a "check if game has ended" step rather than a "don't end the game")
