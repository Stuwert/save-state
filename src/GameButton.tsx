import React from "react";
import { useSelector } from "@xstate/react";
import { ActorRef } from "@xstate/react/lib/types";

export default function GameButton({
  takeTurnAction,
  coordinates,
  tileStateMachine,
}: {
  takeTurnAction: Function; // There's a lot of complicated typing under the hood already being handled by the send function
  tileStateMachine: ActorRef<any, any>;
  coordinates: string;
}) {
  const value = useSelector(tileStateMachine, (state) => state.value);

  const isEmpty = value === "empty";

  return (
    <button
      disabled={!isEmpty}
      className={`w-24 h-24 m-2 rounded shadow-lg bg-gray-50 border-2 border-black hover:bg-white focus:bg-white disabled:opacity-25`}
      onClick={() => takeTurnAction("takeTurn", { data: coordinates })}
    >
      {isEmpty ? undefined : value}
    </button>
  );
}
