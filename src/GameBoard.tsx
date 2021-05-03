import React from "react";
import { Interpreter, State } from "xstate";
import GameButton from "./GameButton";
import { InvokableTile } from "./utility/makeGame";
import { GameContext, GameEvent } from "./gameState";
import { Redirect } from "react-router-dom";

export default function GameBoard({
  gameTiles,
  currentState,
  send,
  service,
}: {
  gameTiles: InvokableTile[][];
  currentState: State<GameContext, GameEvent>;
  send: Function;
  service: Interpreter<GameContext, any, GameEvent>;
}) {
  // service listen to the state change
  // Update the link, I think.
  // Because then I think (hypothesize)
  // That I should get moving backwards and
  // forwards for free with the browser

  /**
   * Todo:
   *
   * I **think** at the moment that because the tiles
   * keep getting re-passed they might get re-invoked
   * but I'm not sure... Well... I'm not passing them from
   * current state... so maybe not.
   */

  const {
    context: { startingPlayer, history },
  } = currentState;

  console.log(startingPlayer);
  console.log(history);

  if (currentState.done) {
    return <Redirect to="/end" />;
  }

  return (
    <div className="flex flex-col">
      {gameTiles.map((gameRow, index) => (
        <div className="flex flex-row justify-center" key={index}>
          {gameRow.map(({ id }: InvokableTile) => {
            const child = service.children.get(id);
            if (!child) return <></>;
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
    </div>
  );
}
