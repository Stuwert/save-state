import makeDroughtTile, { TileStateMachine } from "../gameState/tile";
import { PathValue } from "./loadStateFromHistory";

export interface InvokableTile {
  src: TileStateMachine;
  id: PathValue;
}

/**
 *
 * Question:
 *
 * Will useState be able to access the state
 * of the game tile at this point?
 *
 * @param gameSize
 * @returns
 */

export default function makeGame(gameSize: number): InvokableTile[][] {
  const baseArray = new Array(gameSize).fill("");

  const totalArray = new Array(gameSize).fill(baseArray);

  return totalArray.map(
    (subArray: string[], yAxis: number): InvokableTile[] => {
      return subArray.map(
        (_, xAxis: number): InvokableTile => {
          const id = (xAxis.toString() + "-" + yAxis.toString()) as PathValue;
          return {
            id,
            src: makeDroughtTile([xAxis, yAxis]),
          };
        }
      );
    },
    []
  );
}
