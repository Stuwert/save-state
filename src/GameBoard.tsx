import React, { useState } from "react";
import CryptoJS from "crypto-js";

import { Interpreter, State } from "xstate";
import GameButton from "./GameButton";
import { GameContext, GameEvent } from "./gameState";
import { Redirect } from "react-router-dom";
// import { PathValue, XorO } from "./utility/loadStateFromHistory";

// TODO: Update these to
function generateShareLink(
  startingPlayer: string,
  history: string[],
  setShareCode: Function
): undefined {
  const stringToCrypt = [startingPlayer, ...history].join(":");
  const stringToShare = CryptoJS.AES.encrypt(
    stringToCrypt,
    "bing bong"
  ).toString();
  setShareCode(stringToShare);

  return undefined;
}

export default function GameBoard({
  currentState,
  send,
  service,
}: {
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

  const [shareCode, setShareCode] = useState("");

  const {
    context: { startingPlayer, history },
  } = currentState;

  if (currentState.done) {
    return <Redirect to="/end" />;
  }

  return (
    <div className="flex flex-col">
      {[0, 1, 2].map((gameRow) => (
        <div className="flex flex-row justify-center" key={gameRow}>
          {[0, 1, 2].map((gameCol) => {
            const id = [gameRow, gameCol].join("-");
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
      <p>{shareCode}</p>
      {shareCode === "" && (
        <button
          onClick={() =>
            generateShareLink(startingPlayer, history, setShareCode)
          }
        >
          Generate Share Link
        </button>
      )}
    </div>
  );
}
