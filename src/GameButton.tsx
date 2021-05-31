import React, { useState } from "react";
import { useSelector } from "@xstate/react";
import { ActorRef } from "@xstate/react/lib/types";
import { StateValue } from "xstate";

function GameButton({
  coordinates,
  tileStateMachine,
  currentTurn,
  send,
}: {
  tileStateMachine: ActorRef<any, any>;
  coordinates: string;
  currentTurn: StateValue;
  send: Function;
}) {
  // console.log("hits");

  const value = useSelector(tileStateMachine, (state) => state.value);
  const [hoverValue, setHoverValue] = useState<StateValue | null>(null);

  let displayValue: StateValue | string = "";

  if (value === "empty" && hoverValue) {
    displayValue = hoverValue;
  }
  if (value !== "empty") {
    displayValue = value;
  }

  return (
    <button
      disabled={value !== "empty"}
      className="gameTile activeTile focus:outline-none"
      onClick={() => send("takeTurn", { data: coordinates })}
      onMouseEnter={() => setHoverValue(currentTurn)}
      onMouseLeave={() => setHoverValue(null)}
    >
      {displayValue}
    </button>
  );
}

export default GameButton;
// I'm pretty sure this should work like I expect
// but something is going wrong when it gets memoized
// export default React.memo(GameButton);
