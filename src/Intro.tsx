import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Intro({ send }: { send: Function }) {
  const [stateValue, setStateValue] = useState("");

  return (
    <>
      <button onClick={() => send("pickPlayerTurn")}>
        <Link to="/game">New Game</Link>
      </button>
      <input onChange={(e) => setStateValue(e.target.value)} />
      <button>
        <Link to={`/load/${stateValue}`}>Start From History</Link>
      </button>
    </>
  );
}
