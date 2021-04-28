// Start game
// Check if the game should be ended
// Figure out how to get the information back out? 
// If not, change turns 

import { createMachine, send, StateMachine } from "xstate";


export default function makeGameState(droughtTile: StateMachine<any, any, any> ) {    
    return createMachine({
        id: 'game',
        initial: 'start',
        invoke: {
            id: 'xTest',
            src: droughtTile,
            onDone: {
                target: 'X',
                actions: ['logAction']
            },
            onError: {
                actions: ['logError'],
            }
            // onError: (context, event) => console.log({ context, event })
        },
        states: {
            'endGame': {
                type: 'final'
            },
            X: {
                on: {
                    nextTurn: 'O',
                    takeTurn: {
                        actions: send('X', { to: (context: any, event: any) => event.data }), 
                    }
                }
            },
            O: {
                on: {
                    nextTurn: 'X',
                    takeTurn: {
                        actions: send('O', { to: (context: any, event: any) => event.data }), 
                    }
                }
            },
            start: {
                on: {
                    pickPlayerTurn: 'X'
                }
            }
        }
    }, {
        actions: {
            logAction: (context, event) => {
                console.log('Action logged');
            },
            logError: (context, event) => {
                /**
                 * Todo: Actually make this error.
                 * 
                 * This will want to block the rendering of the game
                 */
                console.log('Error thrown');
            }
        }
    })
}

/**
 * Ok states are confusing the hell out of me
 * 
 * 1. Parent State controlling the game
 * 2. One sub state controlling the remainder
 * 3. Read the current state of each of the smaller keys 
 */

// onDone -> When the child state is done, go and check to see if the game should end
// https://xstate.js.org/docs/guides/communication.html#the-invoke-property