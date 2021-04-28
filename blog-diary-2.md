## The Goal

So final states are a concept in Xstate that basically mean that a state machine cannot act any longer. Once they hit a final state, no matter what actions you send they're way they won't move. This is a super useful concept from a pure representational perspective. When a tile is selected in Tic Tac Toe, it's done!

But one of the goals of the project is basically for the machine to accept an arbitrary string of inputs and then spit out the representation for the current state... or error if it's invalid. 

While `final` states are helpful in the sense that they are a good representation of the makeup of the system, they're unhelpful in that they swallow the errors.

If I say ping a specific square 5 times. It'll just soak that up and keep moving. But I want it throw an error at this point, so the system stops operating and we can alert the error that their input was incorrect. 

## What We Did Instead

This require a bit of a different take for how the system operates. Instead of relying on the default `onDone` functionality, we had to build a communication stream to relay back to the parent that it was time to move on. 

Xstate already has a lot of this good stuff built in, so it was pretty straightforward.

```
escalate({ message: 'Invoking call on final type' })
respond('nextTurn')
```

These are two methods for child state machines (or other forms of invoked services) to communicate back to the invoker.

`escalate` throws an error that the parent will understand
`respond` sends an action back for the parent to take. Luckily we already had some `nextTurn` actions lying around to hook into and take advantage of. Perfect!

So instead of "ending" the machine at an X or O state, we basically enforce terminality and then error if it tries to get out. It's functionally the same with a bit better monitoring and a bit worse from a diagramming perspective.

## What's Next?

I think it's time to take a trip back into the front end and start wiring these concepts up against the main machine.

- Connect the buttons to the action of state machine
- Figure out how to send actions back up the state machine (this should not be that hard)
- Get some better data displays
- Should probably stop defaulting to the X player at some point


## Far Future

At some point I'm going to want to take the show on the road. That will require adding a share state and a consume state, so we can create and consume a hash that will allow players to actually share their game state. And then also connecting it to the router to you know... represent the game state dynamically.