import React, { useState } from "react";
import CryptoJS from "crypto-js";

import GameButton from "./GameButton";
import { GameService } from "./gameState";
import { Redirect } from "react-router-dom";
import { useService } from "@xstate/react";
import { Modal } from "./components/Modal";
import { Robot } from "./utility/loadStateFromHistory";
// import { PathValue, XorO } from "./utility/loadStateFromHistory";

// TODO: Update these to
function generateShareLink(
  robot: Robot,
  startingPlayer: string,
  history: string[],
  setShareCode: Function
): undefined {
  // robot player
  // single or multi player
  // startingPlayer

  const stringToCrypt = [robot, startingPlayer, ...history].join(":");

  const stringToShare = CryptoJS.AES.encrypt(
    stringToCrypt,
    "bing bong"
  ).toString();

  try {
    navigator.clipboard.writeText(stringToShare);
  } catch (error) {
    // do nothing
  }

  setShareCode(stringToShare);

  return undefined;
}

export default function GameBoard({ service }: { service: GameService }) {
  const [currentState, send] = useService(service);
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
    context: { startingPlayer, history, robot },
  } = currentState;

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
                key={id}
                tileStateMachine={child}
                coordinates={id}
                currentTurn={currentState.value}
                send={send}
              />
            );
          })}
        </div>
      ))}
      <Modal show={shouldShow} close={() => setShow(false)}>
        <h1>Share Link</h1>
        <p>
          Share this with your friends so they can try the game from where
          you're at.
        </p>
        <p id="shareLink">{shareCode}</p>
      </Modal>
      <div className="text-center">
        <button
          onClick={() => {
            generateShareLink(robot, startingPlayer, history, setShareCode);
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
