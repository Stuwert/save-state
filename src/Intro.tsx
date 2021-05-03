import React from "react";
import { Link } from "react-router-dom";

export default function Intro({ send }: { send: Function }) {
  return (
    <>
      <button onClick={() => send("pickPlayerTurn")}>
        <Link to="/game">New Game</Link>
      </button>
      <button>Start From History</button>
    </>
  );
}
