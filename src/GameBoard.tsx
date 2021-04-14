import React from 'react';

const startingGameState = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]

export default function GameBoard () {
    return (
        <div className="flex flex-col">
          {startingGameState.map( (gameRow) => {
            return (
              <div className="flex flex-row">
                {gameRow.map( (gameSpot) => <button className="w-24 h-24 m-2 rounded shadow-lg bg-gray-50 border-2 border-black hover:bg-black">{gameSpot}</button>)}
              </div>
            )
          })}
        </div>
      );
}