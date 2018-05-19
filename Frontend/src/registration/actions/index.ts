import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { ApplicantState, AvailabilityState, PartipiantState } from '../state';

export const APPLICANT_CHANGE = 'APPLICANT_CHANGE';

export interface ApplicantChangeAction extends Action {
    change: Partial<ApplicantState>
}

export const applicantChange = (dispatch: Dispatch) => (change: Partial<ApplicantState>) => {
    const action: ApplicantChangeAction = { type: APPLICANT_CHANGE, change: change };
    dispatch(action);
}

export const AVAILABILITY_CHANGE = 'AVAILABILITY_CHANGE';

export interface AvailabilityChangeAction extends Action {
    change: AvailabilityState
}

export const availabilityChange = (dispatch: Dispatch) => (change: AvailabilityState) => {
    const action: AvailabilityChangeAction = { type: AVAILABILITY_CHANGE, change: change };
    dispatch(action);
}

export const PARTIPIENT_CHANGE = 'PARTIPIENT_CHANGE';

export interface PartipientChangeAction extends Action {
    partipiantIndex: number;
    change: Partial<PartipiantState>;
}

export const changePartipiant = (dispatch: Dispatch) => (partipiantIndex: number, change: Partial<PartipiantState>) => {
    const action: PartipientChangeAction = { type: PARTIPIENT_CHANGE, partipiantIndex: partipiantIndex, change: change };
    dispatch(action);
}
