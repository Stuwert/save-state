import React from "react";
import { Interpreter, State } from "xstate";
import GameTile from "./GameTile";
import { GameContext, GameEvent } from "./gameState";

export default function EndGame({
  currentState,
  service,
}: {
  currentState: State<GameContext, GameEvent>;
  service: Interpreter<GameContext, any, GameEvent>;
}) {
  const {
    context: { winCondition },
  } = currentState;

  return (
    <div className="flex flex-col">
      <h1>The Game Is Over</h1>
      {[0, 1, 2].map((gameRow) => (
        <div className="flex flex-row justify-center" key={gameRow}>
          {[0, 1, 2].map((gameCol) => {
            const id = [gameRow, gameCol].join("-");
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
