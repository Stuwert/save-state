/**
 * Goal of this is to pick a piece at random to start
 *
 * it's not to actually
 *
 * should emit an event when that actually happens.
 * Does the machine need to know about this though?
 *
 * Theoretically it can emit this?
 *
 * This could just be a "useAI" component.
 *
 *
 * The main reason this is an issue is that the
 * machine wants to generate the share link.
 */
// parameters: gameService
// returns: boolean

import { send } from "xstate";
import { GameContext, GameEvent } from "../gameState";
import { validValues } from "../utility/loadStateFromHistory";

// This should be a PathValue
function pickCoordinates(history: string[]): string {
  const availableCoordinates = validValues.filter(
    (value: string) => !history.includes(value)
  );

  return availableCoordinates[
    Math.floor(Math.random() * availableCoordinates.length)
  ];
}

export default function takeAiAction(robotTurn: string) {
  return (context: GameContext, event: GameEvent) => {
    if (robotTurn === context.robot) {
      const coordinates = pickCoordinates(context.history);
      /**
       * This is a duplicative function
       * of the "takeTurn" action, but I couldn't
       * seem to get that working, so this will do.
       */
      context.history.push(coordinates);
      return send(robotTurn, { to: coordinates });
    }
  };
}
