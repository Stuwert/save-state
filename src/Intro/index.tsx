import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "../components/Modal";
import HoverReveal from "./HoverReveal";

export default function Intro({ send }: { send: Function }) {
  const [stateValue, setStateValue] = useState("");
  const [shouldShow, setShow] = useState(false);

  const encodedStateValue = encodeURI(stateValue).replace("/", "%2F");
  console.log(encodedStateValue);

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
        <input onChange={(e) => setStateValue(e.target.value)} />
        <button className="border-black">
          <Link to={`/load/${encodedStateValue}`}>Start Game From History</Link>
        </button>
      </Modal>
      <div className="text-center mt-4">
        <button onClick={() => send("pickPlayerTurn")}>
          <Link to="/game">New Game</Link>
        </button>
      </div>
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => setShow(true)}
        >
          {" "}
          Start From Share
        </button>
      </div>
    </div>
  );
}
