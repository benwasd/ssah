import { Dispatch, MapDispatchToPropsParam } from 'react-redux';
import { Action } from 'redux';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface IncrementDecrementAction extends Action {
    count: number
}

export const increment = (dispatch: Dispatch) => (count: number) => {
    const action: IncrementDecrementAction = { type: INCREMENT, count: count };
    return dispatch(action);
}

export const decrement = (dispatch: Dispatch) => (count: number) => {
    const action: IncrementDecrementAction = { type: DECREMENT, count: count };
    return dispatch(action);
}
