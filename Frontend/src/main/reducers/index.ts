import reduceReducers from 'reduce-reducers';
import { Action, combineReducers, Reducer } from 'redux';

import { REQUEST_STARTED, REQUEST_ENDED, RequestStartedAction, RequestEndedAction } from '../actions';
import { reducer as instructorReducer, rootReducer as instructorRootReducer } from '../../instructor/reducers';
import { InstructorState } from '../../instructor/state';
import { reducer as registrationReducer, rootReducer as registrationRootReducer } from '../../registration/reducers';
import { RegistrationState } from '../../registration/state';
import { noopAction, noopReducer } from '../../utils';

const handleRequests: Reducer<number, Action> = (state, action) => {
    if (state === undefined) {
        return 0;
    }
    
    switch (action.type) {
        case REQUEST_STARTED:
            return state + 1;
        case REQUEST_ENDED:
            const requestEnd = action as RequestEndedAction;
            return state - 1;
        default:
            return state;
    }
}

export interface ReducerTree {
    instructor: Reducer<InstructorState, Action>;
    registration: Reducer<RegistrationState, Action>;
    requests: Reducer<number, Action>;
}

export const reducer = reduceReducers(
    combineReducers(<ReducerTree>{ instructor: instructorReducer, registration: registrationReducer, requests: handleRequests }),
    combineReducers(<ReducerTree>{ instructor: instructorRootReducer, registration: registrationRootReducer, requests: noopReducer(0) })
);
