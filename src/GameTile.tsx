import React from "react";
import { TileStateMachine } from "./gameState/tile";
// import { State } from "xstate";
import { useSelector } from "@xstate/react";
import { ActorRef } from "@xstate/react/lib/types";

export default function GameButton({
  tileStateMachine,
  isPartOfWinningCoordinates,
}: {
  takeTurnAction?: Function;
  tileStateMachine: ActorRef<any, any>;
  isPartOfWinningCoordinates?: boolean;
}) {
  const value = useSelector(tileStateMachine, (state) => state.value);

  const isEmpty = value === "empty";

  let background = "bg-gray-50";
  if (isPartOfWinningCoordinates) {
    background = "bg-red-100";
  }

  return (
    <button
      disabled
      className={`w-24 h-24 m-2 rounded shadow-lg ${background} border-2 border-black focus:bg-white opacity-35`}
    >
      {isEmpty ? undefined : value}
    </button>
  );
}
