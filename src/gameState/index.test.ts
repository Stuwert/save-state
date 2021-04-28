import makeDroughtTile from './tile';
import makeGameState from './index';
import { interpret } from 'xstate';

/**
 * do some stuff:
 * 
 * 
 * 1. Practice invoking this and seeing what happens
 * 2. See what happens when communicating from parent to child
 * 3. See what happens during error states.
 */


describe('The Game State', () => {
    const droughtTile = makeDroughtTile([0, 0]);
    describe('Success conditions', () => {
        it('Should start at the start of the game', () => {
            const gameStateMachine = makeGameState(droughtTile);

            const startingState = gameStateMachine.initialState;

            expect(startingState.matches('start')).toBeTruthy();
        })

        it('Should transition from start to X', () => {
            const gameStateMachine = makeGameState(droughtTile);

            const state = gameStateMachine.transition('start', 'pickPlayerTurn');

            expect(state.matches('X')).toBeTruthy();
        })

        it('Should from X to O on nextTurn', () => {
            const gameStateMachine = makeGameState(droughtTile);

            const nextState = gameStateMachine.transition('X', 'nextTurn');

            expect(nextState.matches('O')).toBeTruthy();
        })

        it('Should from O to X on nextTurn', () => {
            const gameStateMachine = makeGameState(droughtTile);

            const nextState = gameStateMachine.transition('O', 'nextTurn');

            expect(nextState.matches('X')).toBeTruthy();
        })
    })

    describe('Should listen to the child machine', () => {

        it('Should transition to the next state when the child is called', (done) => {


            const gameStateMachine = makeGameState(droughtTile);
    
    
            const gameStateService = interpret(gameStateMachine).onTransition((state) => {
                if(state.matches('X')) {
                }
                if (state.matches('O')) {
                    done();
                }
            })


            /**
             * Started the services for the related tiles
             * Expect this to transition to done once it sees the message from tthe child
             * but it's not at the moment, so I'm wondering what's going on.
             */

            gameStateService.start();
            gameStateService.send({ type: 'pickPlayerTurn' });
            gameStateService.send({ type: 'takeTurn', data: 'xTest' })
                
            /**
             * 
             * Got communication working between the parents and children.
             * Now to see how to get the alerting to work if child is already
             * finished.
             * 
             * Big question here is whether or not we can bubble those alerts 
             * back up.
             * 
             * The goal is to create a system that will tell us if an invalid
             * action tries to be played, so during the load phase, the game will 
             * just fail instead of loading an invalid context.
             */
        })

        it('Should warn or do something if the end step keeps being hit', (done) => {
            

            const gameStateMachine = makeGameState(droughtTile);
    
    
            const gameStateService = interpret(gameStateMachine).onTransition((state) => {
                if (state._event.name.includes('error')) {
                    done();
                }
            })

            gameStateService.start();
            gameStateService.send({ type: 'pickPlayerTurn' });
            gameStateService.send({ type: 'takeTurn', data: 'xTest' })
            gameStateService.send({ type: 'takeTurn', data: 'xTest' })
            // gameStateService.send({ type: 'takeTurn', data: 'xTest' })
        
            // // const droughtStateService = interpret(droughtTile).onTransition((state) => {
            //     console.log(state._event.name);
            // })

            // droughtStateService.start();
            // droughtStateService.send('X');
            // droughtStateService.send('X');

            /**
             * Ok so for the erroring functionality, my options are either:
             * 
             * 1. Use done and let it swallow the error, basically breaking the functionality 
             * of doing any error checking if the move is valid (it would swallow it).
             * 2. Don't use don't and explicitly bubbled back up the action to the parent
             * to take the next turn. 
             */
        })
    })
    
})