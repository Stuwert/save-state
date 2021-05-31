import { createMachine, StateMachine } from "xstate";
import { escalate, respond } from "xstate/lib/actions";

interface TileSchema {
  states: {
    empty: {};
    X: {};
    O: {};
  };
}

export type TileEvent = { type: "X" } | { type: "O" };

export type TileStateMachine = StateMachine<null, TileSchema, TileEvent>;

export default function makeDroughtTile(
  id: [number, number]
): TileStateMachine {
  return createMachine({
    id: id.join("-"),
    initial: "empty",
    states: {
      empty: {
        on: {
          X: { target: "X", actions: ["test"] },
          O: { target: "O", actions: ["test"] },
        },
      },
      X: {
        /**
         * So the reason this functions this way is because
         * this is technically a "done" state, but...
         * we need this to yell at the parent if it doesn't
         */
        entry: respond("nextTurn"),
        on: {
          "*": {
            actions: escalate({
              message: `Already at Final X State. Cannot take attempted action for Tile: ${id}`,
            }),
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
