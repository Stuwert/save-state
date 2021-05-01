import React from "react";
import GameButton from "./GameButton";
import makeGame, { InvokableTile } from "./utility/makeGame";
import { useMachine } from "@xstate/react";
import makeGameState from "./gameState";

const GAME_BOARD_SIZE = 3;

const gameTiles = makeGame(GAME_BOARD_SIZE);
const gameBoard = makeGameState(gameTiles.flat());
export default function GameBoard() {
  const [currentState, send, service] = useMachine(gameBoard);

  // console.log(currentState);

  /**
   * Todo:
   *
   * I **think** at the moment that because the tiles
   * keep getting re-passed they might get re-invoked
   * but I'm not sure... Well... I'm not passing them from
   * current state... so maybe not.
   */

  return (
    <div className="flex flex-col">
      {gameTiles.map((gameRow, index) => (
        <div className="flex flex-row justify-center" key={index}>
          {gameRow.map(({ id }: InvokableTile) => {
            const child = service.children.get(id);
            if (!child) return;
            return (
              <GameButton
                takeTurnAction={send}
                key={id}
                tileStateMachine={child}
                coordinates={id}
              />
            );
          })}
        </div>
      ))}
      {currentState.matches("start") && (
        <button onClick={() => send("pickPlayerTurn")}>Start</button>
      )}
    </div>
  );
}
