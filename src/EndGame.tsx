import React from "react";
import { Interpreter, State } from "xstate";
import GameTile from "./GameTile";
import { InvokableTile } from "./utility/makeGame";
import { GameContext, GameEvent } from "./gameState";

export default function EndGame({
  gameTiles,
  currentState,
  service,
}: {
  gameTiles: InvokableTile[][];
  currentState: State<GameContext, GameEvent>;
  service: Interpreter<GameContext, any, GameEvent>;
}) {
  const {
    context: { winCondition },
  } = currentState;

  return (
    <div className="flex flex-col">
      <h1>The Game Is Over</h1>
      {gameTiles.map((gameRow, index) => (
        <div className="flex flex-row justify-center" key={index}>
          {gameRow.map(({ id }: InvokableTile) => {
            const child = service.children.get(id);
            if (!child) return <></>;
            return (
              <GameTile
                key={id}
                tileStateMachine={child}
                isPartOfWinningCoordinates={winCondition?.includes(id) || false}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
