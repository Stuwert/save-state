import React, { useState } from "react";
import { useSelector } from "@xstate/react";
import { ActorRef } from "@xstate/react/lib/types";
import { StateValue } from "xstate";

export default function GameButton({
  takeTurnAction,
  coordinates,
  tileStateMachine,
  currentTurn,
}: {
  takeTurnAction: Function; // There's a lot of complicated typing under the hood already being handled by the send function
  tileStateMachine: ActorRef<any, any>;
  coordinates: string;
  currentTurn: StateValue;
}) {
  const value = useSelector(tileStateMachine, (state) => state.value);
  const [hoverValue, setHoverValue] = useState<StateValue | null>(null);

  let displayValue: StateValue | string = "";

  if (value === "empty" && hoverValue) {
    displayValue = hoverValue;
  }
  if (value !== "empty") {
    displayValue = value;
  }

  // console.log(value);

  // const [currentValue, setValue] = useState(value);

  return (
    <button
      disabled={value !== "empty"}
      className="gameTile activeTile"
      onClick={() => takeTurnAction("takeTurn", { data: coordinates })}
      onMouseEnter={() => setHoverValue(currentTurn)}
      onMouseLeave={() => setHoverValue(null)}
    >
      {displayValue}
    </button>
  );
}
