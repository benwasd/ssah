import { combineReducers, Reducer } from 'redux';

import { DECREMENT, INCREMENT, IncrementDecrementAction } from '../actions';

export interface State {
    counter: number;
    counter2: number;
}

export interface ReducerTree {
    counter?: Reducer<number, IncrementDecrementAction>;
}

const handleCount: Reducer<number, IncrementDecrementAction> = (state, action) => {
    if (state === undefined) {
        return 0;
    }
    
    switch (action.type) {
        case INCREMENT: 
            return state + action.count;
        case DECREMENT:
            return state - action.count;
        default:
            return state;
    }
}

export const reducer = combineReducers(<ReducerTree>{
    counter: handleCount
})
