import CryptoJS from "crypto-js";
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

  const ensureCapsFirstValue = firstValue.toUpperCase();

  if (ensureCapsFirstValue !== "X" && ensureCapsFirstValue !== "O") {
    throw new Error(
      `Invalid Starting Turn, got ${ensureCapsFirstValue} instead of X or O`
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

  return [ensureCapsFirstValue, ...validatedValues];
}

function decryptStringLol(shareLink: string): string {
  const bytes = CryptoJS.AES.decrypt(shareLink, "bing bong");

  const value = bytes.toString(CryptoJS.enc.Utf8);

  console.log(value);
  return value;
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
  send: any
): boolean | string {
  console.log("**");
  const [startingValue, ...turns] = validateString(
    decryptStringLol(inputString)
  );
  try {
    if (!turns.length) {
      throw new Error(
        "There were no turns input, which is the same as starting the game normally"
      );
    }

    // do the starting Value
    // const result = sendToMachine(`startWith${startingValue}`);
    send.send(`startWith${startingValue}`);

    turns.forEach((turn) => {
      console.log("**");
      const currentState = send.send("takeTurn", {
        data: turn,
      });

      console.log(currentState.value);

      if (currentState.matches("endGame")) {
        throw new Error("This Game Has Already Ended!");
      }
    });

    return true;
  } catch ({ message }) {
    return message;
  }
}
