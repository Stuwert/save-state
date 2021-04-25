import { createMachine } from 'xstate';

export default function makeDroughtTile(id: [number, number]) {
    return createMachine({
        id: id.join(' '), // This will have to be dynamic based on invocation
        initial: 'empty',
        states: {
            empty: {
                on: {
                    X: 'X',
                    O: 'O',
                }
            },
            X: {
                type: 'final',
                // So it looks like I don't actually need these, I would just need to capture that error, and then 
                // bubble it up inside the game state on the "load" action
                // on: {
                //     X: {
                //         actions: escalate('Invoking call on final type')
                //     },
                //     O: {
                //         actions: escalate('Invoking call on final type')
                //     }
                // }
            },
            O: {
                type: 'final',
                // on: {
                //     X: {
                //         actions: escalate('Invoking call on final type')
                //     },
                //     O: {
                //         actions: escalate('Invoking call on final type')
                //     }
                // }
            }  
        }
        
    })
    
    
}