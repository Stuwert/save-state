import { createMachine, StateMachine } from "xstate";
import { escalate, respond } from "xstate/lib/actions";

interface TileSchema {
  states: {
    empty: {};
    X: {};
    O: {};
  };
}

type Event = { type: "X" } | { type: "O" } | { type: "*" };

export type TileStateMachine = StateMachine<null, TileSchema, Event>;

export default function makeDroughtTile(
  id: [number, number]
): TileStateMachine {
  return createMachine({
    id: id.join(" "), // This will have to be dynamic based on invocation
    initial: "empty",

    states: {
      empty: {
        // after: {
        //     500: 'X'
        // },
        on: {
          X: "X",
          O: "O",
        },
      },
      X: {
        /**
         * So the reason this functions this way is because
         * this is technically a "done" state, but...
         * we need this to yell at the parent if it doesn't
         */
        entry: respond("nextTurn"),
        // So it looks like I don't actually need these, I would just need to capture that error, and then
        // bubble it up inside the game state on the "load" action
        on: {
          "*": {
            actions: [
              escalate({
                message: `Already at Final X State. Cannot take attempted action for Tile: ${id}`,
              }),
              "log",
            ],
          },
        },
      },
      O: {
        entry: respond("nextTurn"),
        on: {
          "*": {
            actions: escalate({
              message: `Already at Final O State. Cannot take attempted action for Tile: ${id}`,
            }),
          },
        },
      },
    },
  });
}
