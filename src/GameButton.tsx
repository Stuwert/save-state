import React from 'react';
import { useMachine } from '@xstate/react';
import makeDroughtTile from './gameState/tile';
import { State } from 'xstate';

function getValue(current: State<any>): 'X' | 'O' | null {
   if (current.matches('X')) return 'X';
   if (current.matches('Y')) return 'O';

   return null;
}

export default function GameButton({ gameValue, coordinates }: { gameValue: string; coordinates: [number, number] }) {
   const tileStateMachine = makeDroughtTile(coordinates);
   
   const [current, send] = useMachine(tileStateMachine);





   return (
      <button 
         className="w-24 h-24 m-2 rounded shadow-lg bg-gray-50 border-2 border-black hover:bg-white focus:bg-white"
         onClick={() => send('X')}
      >
         {getValue(current)}
      </button>
   )
}