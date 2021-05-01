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
