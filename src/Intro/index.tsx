import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Interpreter, State } from "xstate";
import { Modal } from "../components/Modal";
import { GameContext, GameEvent } from "../gameState";
import HoverReveal from "./HoverReveal";

const pickRobot = (send: Function) => () => {
  let robot = "X";

  if (Math.random() > 0.5) {
    robot = "O";
  }

  return send("pickPlayerTurn", { robot });
};

export default function Intro({
  send,
  service,
  currentState,
}: {
  send: Function;
  service: Interpreter<GameContext, any, GameEvent>;
  currentState: State<GameContext, GameEvent>;
}) {
  const [stateValue, setStateValue] = useState("");
  const [shouldShow, setShow] = useState(false);

  const encodedStateValue = encodeURI(stateValue).replace("/", "%2F");

  if (currentState.value !== "start") {
    service.start();
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col text-center text-6xl">
        <div className="flex flex-row justify-center mt-8">
          <HoverReveal>T</HoverReveal>
          <HoverReveal>i</HoverReveal>
          <HoverReveal>c</HoverReveal>
        </div>
        <div className="flex flex-row justify-center">
          <HoverReveal>T</HoverReveal>
          <HoverReveal>a</HoverReveal>
          <HoverReveal>c</HoverReveal>
        </div>
        <div className="flex flex-row justify-center">
          <HoverReveal>T</HoverReveal>
          <HoverReveal>o</HoverReveal>
          <HoverReveal>e</HoverReveal>
        </div>
      </div>
      <Modal show={shouldShow} close={() => setShow(false)}>
        <div className="relative h-10 input-component mb-5">
          <h2>Start A Game From a Share Link</h2>
          <input
            className="h-full w-full border-4 border-gray-300 px-2 transition-all border-blue rounded focus:border-4 focus:border-gray-500 focus:outline-none"
            onChange={(e) => setStateValue(e.target.value)}
            onPaste={(e) => {
              const clipBoardData = e.clipboardData.getData("Text");
              setStateValue(clipBoardData.trim());
            }}
          />
        </div>
        <button className="simpleButton">
          <Link to={`/load/${encodedStateValue}`}>Start</Link>
        </button>
      </Modal>
      <div className="text-center mt-4">
        <button onClick={pickRobot(send)} className="simpleButton">
          <Link to="/game">New Single Player Game</Link>
        </button>
      </div>
      <div className="text-center mt-4">
        <button onClick={() => send("pickPlayerTurn")} className="simpleButton">
          <Link to="/game">New Two Player Game</Link>
        </button>
      </div>
      <div className="text-center">
        <button className="simpleButton" onClick={() => setShow(true)}>
          {" "}
          Start From Code
        </button>
      </div>
    </div>
  );
}
