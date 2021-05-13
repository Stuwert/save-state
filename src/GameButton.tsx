import React, { useState } from "react";
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

  // console.log(value);

  // const [currentValue, setValue] = useState(value);

  return (
    <button
      disabled={value !== "empty"}
      className="gameTile activeTile"
      onClick={() => takeTurnAction("takeTurn", { data: coordinates })}
      // onMouseEnter={() => setValue("X")}
      // onMouseLeave={() => setValue(value)}
    >
      {value === "empty" ? undefined : value}
    </button>
  );
}
