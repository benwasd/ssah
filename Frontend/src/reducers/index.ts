import { reducer as registrationReducer, rootReducer as registrationRootReducer } from '../registration/reducers';
import reduceReducers from 'reduce-reducers';
import { combineReducers, Reducer, Action } from 'redux';
import { RegistrationState } from '../registration/state';

export interface ReducerTree {
    registration: Reducer<RegistrationState, Action>;
}

export const reducer = reduceReducers(
    combineReducers(<ReducerTree>{ registration: registrationReducer }),
    combineReducers(<ReducerTree>{ registration: registrationRootReducer })
);
