import { createMachine, actions } from 'xstate';

const { escalate } = actions;

export default function makeDroughTile(id: [number, number]) {
    return createMachine({
        id: '1', // This will have to be dynamic based on invocation
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
                on: {
                    X: {
                        actions: escalate('Invoking call on final type')
                    },
                    O: {
                        actions: escalate('Invoking call on final type')
                    }
                }
            },
            O: {
                type: 'final',
                on: {
                    X: {
                        actions: escalate('Invoking call on final type')
                    },
                    O: {
                        actions: escalate('Invoking call on final type')
                    }
                }
            }  
        }
        
    })
    
    
}