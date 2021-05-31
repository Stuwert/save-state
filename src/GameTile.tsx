import React from "react";
import { useSelector } from "@xstate/react";
import { ActorRef } from "@xstate/react/lib/types";

export default function GameButton({
  tileStateMachine,
  isPartOfWinningCoordinates,
}: {
  tileStateMachine: ActorRef<any, any>;
  isPartOfWinningCoordinates?: boolean;
}) {
  const value = useSelector(tileStateMachine, (state) => state.value);

  const isEmpty = value === "empty";

  let modifier = "";
  if (isPartOfWinningCoordinates) {
    modifier = "winningTile";
  }

  return (
    <div className={`pt-2 text-center gameTile ${modifier}`}>
      {isEmpty ? undefined : value}
    </div>
  );
}
