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
          {startingGameState.map( (gameRow, xAxis) => {
            return (
              <div className="flex flex-row justify-center">
                {gameRow.map( (gameValue, yAxis) => <GameButton gameValue={gameValue} coordinates={[xAxis, yAxis]} /> )}
              </div>
            )
          })}
        </div>
      );
}