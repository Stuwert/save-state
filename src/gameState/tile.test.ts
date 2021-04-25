import makeDroughtTile from './tile';

describe('make drought tile', () => {
    it('should return a state machine with the id set to the array passed', () => {
        const stateMachine = makeDroughtTile([1, 1]);

        expect(stateMachine.id).toEqual('1 1');
    })

    it('Should update from null to X if X is passed', () => {
        const stateMachine = makeDroughtTile([1, 1]);

        const actualState = stateMachine.transition('empty', 'X');
    
        expect(actualState.matches('X')).toBeTruthy();
    })
    
    it('Should update from null to O if O is passed', () => {
        const stateMachine = makeDroughtTile([1, 1]);

        const actualState = stateMachine.transition('empty', 'O');
    
        expect(actualState.matches('O')).toBeTruthy();
    })

    it('Should warn if not null O -> X', () => {
        const stateMachine = makeDroughtTile([1, 1]);

        const actualState = stateMachine.transition('O', 'X');
    
        /**
         * Currently this only checks that the 
         * state won't change under the hood.
         * 
         * TODO: Also check that a warning is emitted
         */

        expect(actualState.matches('O')).toBeTruthy();
    })
    
    it('Should warn if not null X -> O', () => {
        /**
         * Currently this only checks that the 
         * state won't change under the hood.
         * 
         * TODO: Also check that a warning is emitted
         */

         const stateMachine = makeDroughtTile([1, 1]);

         const actualState = stateMachine.transition('X', 'O');
     
         expect(actualState.matches('X')).toBeTruthy();
 
    })
})