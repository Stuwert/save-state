import React from 'react';
import GameBoard from './GameBoard';



function App() {
return <div className="flex flex-col">
  <h1 className="text-xl self-center">Tic Tac Toe</h1>
  <GameBoard />
</div>
}

export default App;

/**
 * Components of the game to be built (theoretically?)
 * 
 * 
 * 1. modifying the state of a given cell
 * 2. checking the game (i.e. if we give the game a valid set of instructions, can it recreate it?)
 * 3. Replaying the game state
 * 4. Sharing the game state
 * 
 * 
 * Does the game state need to be replayable? 
 * 
 * Should it just capture the last say... 5 moves and munge the rest?
 * This is a memory question (i.e. replaying the entire game is harder)
 * But it's also a "what problem are we trying to solve question"
 * If it's more important to capture the raw state, how would the 
 * game know if it's true? Does the game even care? I.e. if this is just a hash
 * (does the hashing part really even matter here? lol no)
 * 
 * What happens if we "accidentally" put the game into an unworkable state. What then? 
 */