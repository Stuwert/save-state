## The Goal

I struggled a bit with figuring out how to get xstate up and running for a fun side project I'm working on at the moment, so I wanted to document some of the things I wanted to mess around with. 

The goal of the project was to use `xstate` as a state machine to capture a simple 2 player game (like Minesweeper) to represent the different phases of the game. 

My thought was to use a series of state machines, children who were responsible for storing the state of a single unit. And the parent who was responsible for orchestrating the current player's turn and then determining whether or not the game is done.

## What I Ran Into

I started by creating two simple state machines. One parent machine that switched turns on demand (the `nextTurn` function), and a child that started empty and then ended with either an `X` or an `O`. 

Once I had the basic tests running I wanted to validate that once a child state changed I could orchestrate it so that would automatically change the current player's turn. 

## The Start

I started by investigating and trying to figure out how exactly these relationships got set-up.  I've found Xstate's documentation to be somewhat difficult to browser. I found it in the "services" section. Services, broadly are the ways that state machines communicate with external sources like promises, observables, or other machines!

I learned about the `invoke` variable, and that this invocation could be referenced by an array in addition to an objec.

The function to start is pretty straightforward. I created a function that returned `createMachine` and associates the machine I pass into it as a `src` for an invocation for both the `O` and the `X` states. I wanted to start with something pretty straightforward so that I could validate that a single back and forth communication would work.

## Tests Not Passing

I started by doing a pretty basic transition test like I had earlier, but this wasn't working as I expected. Even after associating the machines, calling `transition` on the child machine didn't modify the parent state, and I realized that I didn't even know how to access current state.

On retrospect, given my previous experience with React/Redux I should've realized this needed to be accessed within a call back. 

## Running Into Documentation

Ok, so now I realized I had this in services, so I invoked **both** the child machine and the parent machine in separate services. 

This was... in a word, unproductive. Pinging the child service on its own also had no impact on the parent machine. No dice.

So I did some research on the home page and realized that the parent and the child were invoked within the same service... but the documentation used an automatically triggering example. The child had an "after" denotation that basically meant that it would automatically trigger. 

But I needed a way to talk to it, because I wanted to mimic the user clicking a button. I did some research into investigating whether or no the `send` method on the service could 

And then I realized that the only way to talk to a parent and child within the same service was to create a custom action that I coul


## Taking it a step further

Once we got here I was cooking with gas. Woo. So the next step was to figure out how exactly I could trigger *which* service I wanted to trigger. 

Now I needed to build a new action insde of my game state machine to transmit the information down to the child:

```
send('O', { to: 'test'})
```

Xstate has these really helpful declarative functions that basically do what they say. This means I'm sending the 'O' transition to a child with the name of 'test'.

Awesome so far. But if I want to send this to an arbitrary child, maybe one of say 9(?), how would I do that. 

`https://xstate.js.org/docs/guides/actions.html#send-action`

There are a few different ways to handle this. Basically Xstate lets you be super permissive with which level of specificity you need to access.

If you want to completely customize the send action you can pass a callback. But... if you want to just customize the `to` component, you can assign the `to` property as a callback on its own. It's neat and clean:

``` 
    actions: send('X', { to: (context: any, event: any) => event.data }), 

```

As you might note here, I have context and event defined as anys. As far as I'm aware I should be reading the data tag off of the context, but it was coming through as undefined on the send event.

```
    gameStateService.send({ type: 'takeTurn', data: 'xTest' })
```

I'm guessing this will change as I go further in the process and wire this into the buttons on the react side, but for now it's functioning and I'm happy with it. 


## Next Steps

Ok so the next thing I want to figure out is how to get the children to communicate back to the parent during error states. 

There's a helpful `final` condition we can set, that basically says once a state machine hits here, it won't go further. If you try to continue making changes the machine will send warnings. 

What I want to figure out is if `xstate` automatically transmits those communications or if I have to use functionality like `escalate` 

## Further into the project

Once I get these things working, the next big goal is to get this wired into the application and making a functional game.

- Using guards(?) or some other functionality to check whether or not the game should end before the 
    - Potential problems: Mapping the values of the game states (using history maybe) to the map of the screen
- Displaying this on the "app"
- Getting a history function wired up:
    - Integrating React Router
    - Figuring out how to read the url and then translate that into game state, if not already loaded 