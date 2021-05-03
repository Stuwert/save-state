import {
  ActorRef,
  ActorRefFrom,
  Interpreter,
  SpawnedActorRef,
  State,
} from "xstate";
import { TileStateMachine } from "../gameState/tile";
import { XorO, PathValue } from "./loadStateFromHistory";

export function isGameOver(allChildren: {
  [s: string]: Interpreter<TileStateMachine>;
}):
  | {
      winner: XorO;
      winCondition: PathValue[];
    }
  | false {
  // check all rows
  // check all columns
  // check diagonals

  const winConditions: PathValue[][] = [
    ["0-0", "0-1", "0-2"],
    ["1-0", "1-1", "1-2"],
    ["2-0", "2-1", "2-2"],
    ["0-0", "1-0", "2-0"],
    ["0-1", "1-1", "2-1"],
    ["0-2", "1-2", "2-2"],
    ["0-0", "1-1", "2-2"],
    ["0-2", "1-1", "2-0"],
  ];

  let winner: XorO | null = null;
  let winCondition: PathValue[] = [];

  const valueMapper = {
    X: 1,
    O: -1,
  };

  for (let i = 0; i < winConditions.length; i++) {
    const coordinateArray = winConditions[i];

    const totalValue = coordinateArray.reduce((sum, coordinate) => {
      const child = allChildren[coordinate];

      if (child.state.value === "X" || child.state.value === "O") {
        return valueMapper[child.state.value] + sum;
      }

      return sum;
    }, 0);

    if (totalValue === 3) {
      winner = "X";
      winCondition = coordinateArray;
      break;
    }

    if (totalValue === -3) {
      winner = "O";
      winCondition = coordinateArray;
      break;
    }
  }

  if (winner === null || winCondition.length === 0) {
    return false;
  }

  return {
    winner,
    winCondition,
  };
}
