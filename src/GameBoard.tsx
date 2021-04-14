import React from 'react';
import GameButton from './GameButton'

const startingGameState = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]

export default function GameBoard () {
    return (
        <div className="flex flex-col">
          {startingGameState.map( (gameRow) => {
            return (
              <div className="flex flex-row justify-center">
                {gameRow.map( (gameValue) => <GameButton gameValue={gameValue} /> )}
              </div>
            )
          })}
        </div>
      );
}