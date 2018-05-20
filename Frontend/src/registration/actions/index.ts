import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { ApplicantState, AvailabilityState, PartipiantState, hasAllRegistrationProperties } from '../state';
import { RegistrationApiProxy, RegistrationDto, RegistrationParticipantDto } from '../../api';
import { State } from '../../state';

export const APPLICANT_CHANGE = 'APPLICANT_CHANGE';

export interface ApplicantChangeAction extends Action {
    change: Partial<ApplicantState>
}

export const applicantChange = (change: Partial<ApplicantState>) => (dispatch: Dispatch) => {
    const action: ApplicantChangeAction = { type: APPLICANT_CHANGE, change: change };
    dispatch(action);
}

export const AVAILABILITY_CHANGE = 'AVAILABILITY_CHANGE';

export interface AvailabilityChangeAction extends Action {
    change: AvailabilityState
}

export const availabilityChange = (change: AvailabilityState) => (dispatch: Dispatch) => {
    const action: AvailabilityChangeAction = { type: AVAILABILITY_CHANGE, change: change };
    dispatch(action);
}

export const PARTIPIENT_CHANGE = 'PARTIPIENT_CHANGE';

export interface PartipientChangeAction extends Action {
    partipiantIndex: number;
    change: Partial<PartipiantState>;
}

export const changePartipiant = (partipiantIndex: number, change: Partial<PartipiantState>) => (dispatch: Dispatch) => {
    const action: PartipientChangeAction = { type: PARTIPIENT_CHANGE, partipiantIndex: partipiantIndex, change: change };
    dispatch(action);
}

export const REGISTRATION_LOADED = 'REGISTRATION_LOADED';

export interface RegistrationLoadedAction extends Action {
    registration: RegistrationDto;
}

export const loadRegistration = (id: string) => (dispatch: Dispatch) => {
    const apiProxy = new RegistrationApiProxy();
    apiProxy.getRegistration(id).then(r => {
        const action: RegistrationLoadedAction = { type: REGISTRATION_LOADED, registration: r };
        dispatch(action);
    })
}

export const REGISTRATION_SUBMIT = 'REGISTRATION_SUBMITTED';

export interface RegistrationSubmittedAction extends Action {
    registrationId: string;
    applicantId: string;
}

export const submitRegistration = () => (dispatch: Dispatch, getState: () => State) => {
    const apiProxy = new RegistrationApiProxy();
    const registrationState = getState().registration;

    const registrationDto = new RegistrationDto();
    registrationDto.init(registrationState.applicant);
    registrationDto.registrationId = registrationState.id;
    registrationDto.preferSimultaneousCourseExecutionForPartipiants = registrationState.applicant.preferSimultaneousCourseExecutionForPartipiants;
    registrationDto.availableFrom = registrationState.availability.availableFrom;
    registrationDto.availableTo = registrationState.availability.availableTo;

    registrationDto.participants = registrationState.partipiants.filter(hasAllRegistrationProperties).map(p => {
        const registrationParticipants = new RegistrationParticipantDto();
        registrationParticipants.init(p);
        registrationParticipants.ageGroup = parseInt(p.ageGroup);
        registrationParticipants.language = registrationState.applicant.language;
        return registrationParticipants;
    });

    apiProxy.register(registrationDto).then(r => {
        const action: RegistrationSubmittedAction = { type: REGISTRATION_SUBMIT, applicantId: r.applicantId, registrationId: r.registrationId };
        dispatch(action);
    });
}
