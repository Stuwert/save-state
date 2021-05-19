import React, { useState } from "react";
import CryptoJS from "crypto-js";

import { Interpreter, State } from "xstate";
import GameButton from "./GameButton";
import { GameContext, GameEvent } from "./gameState";
import { Redirect } from "react-router-dom";
import { useService } from "@xstate/react";
import { Modal } from "./components/Modal";
// import { PathValue, XorO } from "./utility/loadStateFromHistory";

// TODO: Update these to
function generateShareLink(
  startingPlayer: string,
  history: string[],
  setShareCode: Function
): undefined {
  // startingPlayer
  // single or multi player
  // robot player

  const stringToCrypt = [startingPlayer, ...history].join(":");

  console.log({ stringToCrypt });
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
  const [state] = useService(service);
  console.log(state);
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
  const [shouldShow, setShow] = useState(false);

  const {
    value,
    context: { startingPlayer, history },
  } = state;

  if (value === "start") {
    return <Redirect to="/" />;
  }

  if (currentState.done) {
    return <Redirect to="/end" />;
  }

  return (
    <div className="flex flex-col mt-8">
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
                currentTurn={state.value}
              />
            );
          })}
        </div>
      ))}
      <Modal show={shouldShow} close={() => setShow(false)}>
        {shareCode}
      </Modal>
      <div className="text-center">
        <button
          onClick={() => {
            generateShareLink(startingPlayer, history, setShareCode);
            setShow(true);
          }}
          className="simpleButton"
        >
          Generate Share Link
        </button>
      </div>
    </div>
  );
}
