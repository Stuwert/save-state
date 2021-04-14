import React from 'react';

export default function GameButton({ gameValue }: { gameValue: string }) {
   return <button className="w-24 h-24 m-2 rounded shadow-lg bg-gray-50 border-2 border-black hover:bg-black focus:bg-black">{gameValue}</button>
}