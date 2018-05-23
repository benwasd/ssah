import reduceReducers from 'reduce-reducers';
import { Action, combineReducers, Reducer } from 'redux';

import { reducer as instructorReducer, rootReducer as instructorRootReducer } from '../../instructor/reducers';
import { InstructorState } from '../../instructor/state';
import { reducer as registrationReducer, rootReducer as registrationRootReducer } from '../../registration/reducers';
import { RegistrationState } from '../../registration/state';

export interface ReducerTree {
    instructor: Reducer<InstructorState, Action>;
    registration: Reducer<RegistrationState, Action>;
}

export const reducer = reduceReducers(
    combineReducers(<ReducerTree>{ instructor: instructorReducer, registration: registrationReducer }),
    combineReducers(<ReducerTree>{ instructor: instructorRootReducer, registration: registrationRootReducer })
);
