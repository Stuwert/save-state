import React from "react";
import { Link } from "react-router-dom";
/**
 * 2. Split the segments into turns
 * 3. Take the turns
 * 4. If it errors, go to an error state
 * 5. If it doesn't, load the game.
 *
 */
/**
 * TODO: Figure out how to generate the type based on the array.
 */

const validValues = [
  "0-0",
  "0-1",
  "0-2",
  "1-0",
  "1-1",
  "1-2",
  "1-3",
  "2-0",
  "2-1",
  "2-2",
];
export type XorO = "X" | "O";
export type PathValue =
  | "0-0"
  | "0-1"
  | "0-2"
  | "1-0"
  | "1-1"
  | "1-2"
  | "1-3"
  | "2-0"
  | "2-1"
  | "2-2";
type ValidatedArray = [XorO, ...PathValue[]];

export function validateString(inputFromUser: string): ValidatedArray {
  const [firstValue, ...restOfValues] = inputFromUser.split(":");

  if (firstValue !== "X" && firstValue !== "O") {
    throw new Error(
      `Invalid Starting Turn, got ${firstValue} instead of X or O`
    );
  }

  const { validatedValues, invalidValues } = restOfValues.reduce<{
    validatedValues: PathValue[];
    invalidValues: string[];
  }>(
    ({ validatedValues, invalidValues }, valuePair) => {
      if (validValues.includes(valuePair)) {
        return {
          invalidValues,
          // Type casting works here because we're validating in the if check
          validatedValues: [...validatedValues, valuePair as PathValue],
        };
      }

      return {
        validatedValues,
        invalidValues: [...invalidValues, valuePair],
      };
    },
    {
      validatedValues: [],
      invalidValues: [],
    }
  );

  if (invalidValues.length) {
    throw new Error(`Invalid Path Values Passed: ${invalidValues.join(" ")}`);
  }

  return [firstValue, ...validatedValues];
}

/**
 * Returns true if the game can load and the player can begin playing
 * Returns a string if the game cannot load and the player cannot begin playin
 *
 * @param inputString
 * @returns
 */
export default function loadStateFromHistory(
  inputString: string,
  sendToMachine: Function
): React.ReactElement | string {
  try {
    const [startingValue, ...turns] = validateString(inputString);

    sendToMachine("start");

    // do the starting Value
    sendToMachine(`startWith${startingValue}`);

    turns.forEach((turn) => {
      const currentState = sendToMachine("takeTurn", {
        coordinates: turn.split(""),
      });

      /**
       * If the game is rewindable,
       * this would also have to save the navigation
       * path and return it...
       */

      console.log(currentState);

      if (currentState.matches("endState")) {
        throw new Error("This Game Has Already Ended!");
      }
      // do the turn value
      // check if game has ended
      // if game has ended, throw an error
    });
    const navigationPath = turns.join("/");

    return React.createElement(Link, { to: navigationPath });
  } catch ({ message }) {
    return message;
  }
}
