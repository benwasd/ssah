import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { ApplicantState } from '../state';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface IncrementDecrementAction extends Action {
    count: number
}

export const increment = (dispatch: Dispatch) => (count: number) => {
    const action: IncrementDecrementAction = { type: INCREMENT, count: count };
    dispatch(action);
}

export const decrement = (dispatch: Dispatch) => (count: number) => {
    const action: IncrementDecrementAction = { type: DECREMENT, count: count };
    dispatch(action);
}


export const APPLICANT_CHANGE = 'APPLICANT_CHANGE';

export interface ApplicantChangeAction extends Action {
    change: Partial<ApplicantState>
}

export const applicantChange = (dispatch: Dispatch) => (change: Partial<ApplicantState>) => {
    const action: ApplicantChangeAction = { type: APPLICANT_CHANGE, change: change };
    dispatch(action);
}
