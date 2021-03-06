import {
  Interpreter,
  Machine,
  send,
  State,
  StateMachine,
  actions,
} from "xstate";
import { isGameOver } from "../utility/isGameOver";
import { Robot, XorO } from "../utility/loadStateFromHistory";
import makeGame from "../utility/makeGame";
import takeAiAction from "./quoteunquoteai";

const { pure, assign } = actions;

export interface GameSchema {
  context: GameContext;
  states: {
    endGame: {};
    X: {};
    O: {};
    start: {};
    pickAtRandom: {};
  };
}

export interface GameContext {
  startingPlayer: string;
  history: string[]; // This could actually be that path array
  robot?: XorO;
  winner: string | null; // this could also be X or Y
  winCondition?: string[];
}

export type GameEvent =
  | { type: "nextTurn" }
  | { type: "takeTurn"; data: string }
  | { type: "pickPlayerTurn"; robot: XorO }
  | { type: "startWithX" }
  | { type: "startWithO" }
  | { type: "setRobotValue"; robot: Robot }
  | { type: "" };

export type GameStateStateMachine = StateMachine<
  GameContext,
  GameSchema,
  GameEvent
>;

export type GameService = Interpreter<
  GameContext,
  any,
  GameEvent,
  { value: any; context: GameContext }
>;

export type GameState = State<
  GameContext,
  GameEvent,
  any,
  { value: any; context: GameContext }
>;

const isMoreThanHalf = () => Math.random() > 0.5;

export default function makeGameState(): GameStateStateMachine {
  return Machine<GameContext, GameSchema, GameEvent>(
    {
      id: "game",
      initial: "start",
      context: {
        startingPlayer: "",
        history: [],
        winner: null,
        winCondition: [],
      },
      invoke: makeGame(3).flat(),
      states: {
        endGame: {
          type: "final",
        },
        X: {
          // figure out how to record coordinates
          // @ts-ignore
          entry: pure(takeAiAction("X")),
          on: {
            nextTurn: [
              { target: "endGame", cond: "isGameOver" },
              { target: "O" },
            ],
            takeTurn: {
              actions: [
                send("X", {
                  to: (context: any, event: any) => event.data,
                }),
                "recordTurn",
              ],
            },
            setRobotValue: {
              actions: "setRobot",
            },
          },
        },
        O: {
          // @ts-ignore
          entry: pure(takeAiAction("O")),
          on: {
            nextTurn: [
              { target: "endGame", cond: "isGameOver" },
              { target: "X" },
            ],
            takeTurn: {
              actions: [
                send("O", {
                  to: (context: any, event: any) => event.data,
                }),
                "recordTurn",
              ],
            },
            setRobotValue: {
              actions: "setRobot",
            },
          },
        },
        start: {
          on: {
            pickPlayerTurn: {
              target: "pickAtRandom",
              actions: ["setRobot"],
            },
            startWithX: {
              target: "X",
              actions: ["recordFirstPlayer", "setRobot"],
            },
            startWithO: {
              target: "O",
              actions: ["recordFirstPlayer", "setRobot"],
            },
          },
        },
        pickAtRandom: {
          exit: ["recordFirstPlayer"],
          always: [
            {
              target: "X",
              cond: isMoreThanHalf,
            },
            {
              target: "O",
            },
          ],
        },
      },
    },
    {
      actions: {
        recordFirstPlayer: (context, event, { state }) => {
          if (state && state.matches("O")) {
            context.startingPlayer = "O";
            return;
          }
          if (state && state.matches("X")) {
            context.startingPlayer = "X";
            return;
          }

          throw new Error("Failed to store starting player");
        },
        recordTurn: (context, event, { state }) => {
          if (event.type === "takeTurn") {
            context.history?.push(event.data);
          }
        },
        setRobot: assign({
          robot: (context, event) => {
            if (
              event.type === "pickPlayerTurn" ||
              event.type === "setRobotValue"
            ) {
              return event.robot;
            }
            return context.robot;
          },
        }),
      },
      guards: {
        isGameOver: (context, event, { state }) => {
          // @ts-expect-error
          const gameResult = isGameOver(state.children);

          if (gameResult === false) return false;
          if (gameResult === "draw") {
            context.winner = null;
            return true;
          }

          const { winner, winCondition } = gameResult;

          context.winner = winner;
          context.winCondition = winCondition;

          return true;
        },
      },
    }
  );
}

/**
 * Ok states are confusing the hell out of me
 *
 * 1. Parent State controlling the game
 * 2. One sub state controlling the remainder
 * 3. Read the current state of each of the smaller keys
 */

// onDone -> When the child state is done, go and check to see if the game should end
// https://xstate.js.org/docs/guides/communication.html#the-invoke-property
