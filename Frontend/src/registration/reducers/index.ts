import { combineReducers, Reducer, Action } from 'redux';

import { DECREMENT, INCREMENT, IncrementDecrementAction, APPLICANT_CHANGE, ApplicantChangeAction } from '../actions';
import { ApplicantState } from '../state';

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

const handleApplicant: Reducer<ApplicantState, Action> = (state, action) => {
    if (state === undefined) {
        return { givenname: "wuwas", surname: "", residence: "", phoneNumber: "" };
    }
    
    switch (action.type) {
        case APPLICANT_CHANGE: 
            return Object.assign({}, state, (<ApplicantChangeAction>action).change);
        default:
            return state;
    }
}

export interface ReducerTree {
    counter?: Reducer<number, IncrementDecrementAction>;
    applicant?: Reducer<ApplicantState, Action>;
}

export const reducer = combineReducers(<ReducerTree>{
    counter: handleCount,
    applicant: handleApplicant
})
