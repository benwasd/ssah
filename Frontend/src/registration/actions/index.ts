import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { ApplicantState, AvailabilityState, PartipiantState, hasAllRegistrationProperties } from '../state';
import { RegistrationApiProxy, RegistrationDto, RegistrationParticipantDto, PossibleCourseDto } from '../../api';
import { State } from '../../state';
import { throwIfUndefined } from '../../utils';

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

export const PARTIPIENT_SELECT_COURSE = 'PARTIPIENT_SELECT_COURSE';

export interface PartipientSelectCourseAction extends Action {
    partipiantId: string;
    selectedCourses: { identifier: number; startDate: Date; }[];
}

export const selectCoursesForPartipiant = (partipiantId: string, selectedCourses: { identifier: number; startDate: Date; }[]) => (dispatch: Dispatch) => {
    const action: PartipientSelectCourseAction = { type: PARTIPIENT_SELECT_COURSE, partipiantId, selectedCourses };
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

export const submitOrUpdateRegistration = (onSubmitted: (registrationId: string) => void) => (dispatch: Dispatch, getState: () => State) => {
    const apiProxy = new RegistrationApiProxy();
    const registrationState = getState().registration;

    const registrationDto: RegistrationDto = {
        registrationId: registrationState.id ? registrationState.id : undefined,
        surname: registrationState.applicant.surname,
        givenname: registrationState.applicant.givenname,
        phoneNumber: registrationState.applicant.phoneNumber,
        residence: registrationState.applicant.residence,
        preferSimultaneousCourseExecutionForPartipiants: registrationState.applicant.preferSimultaneousCourseExecutionForPartipiants,
        availableFrom: throwIfUndefined(registrationState.availability.availableFrom),
        availableTo: throwIfUndefined(registrationState.availability.availableTo),
        status: registrationState.status,
        participants: registrationState.partipiants.filter(hasAllRegistrationProperties).map(p => {
            return <RegistrationParticipantDto>{
                name: p.name,
                courseType: p.courseType,
                discipline: p.discipline,
                niveauId: p.niveauId,
                ageGroup: parseInt(p.ageGroup),
                language: registrationState.applicant.language
            };
        })
    }

    if (registrationDto.registrationId) {
        apiProxy.update(registrationDto).then(r => {
            const action: RegistrationSubmittedAction = { type: REGISTRATION_SUBMIT, applicantId: r.applicantId, registrationId: r.registrationId };
            dispatch(action);
            onSubmitted(action.registrationId);
        });
    }
    else {
        apiProxy.register(registrationDto).then(r => {
            const action: RegistrationSubmittedAction = { type: REGISTRATION_SUBMIT, applicantId: r.applicantId, registrationId: r.registrationId };
            dispatch(action);
            onSubmitted(action.registrationId);
        });
    }
}

export const REGISTRATION_POSSIBLE_COURSES_LOADED = 'REGISTRATION_POSSIBLE_COURSES_LOADED';

export interface RegistrationPossibleCoursesLoadedAction extends Action {
    possibleCourses: PossibleCourseDto[];
}

export const loadPossibleCourses = () => (dispatch: Dispatch, getState: () => State) => {
    const apiProxy = new RegistrationApiProxy();
    apiProxy.possibleCourseDatesPerPartipiant(throwIfUndefined<string>(getState().registration.id)).then(r => {
        const action: RegistrationPossibleCoursesLoadedAction = { type: REGISTRATION_POSSIBLE_COURSES_LOADED, possibleCourses: r }
        dispatch(action);
    });
}
