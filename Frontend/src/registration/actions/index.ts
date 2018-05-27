import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { CommitRegistrationDto, CommitRegistrationParticipantDto, PossibleCourseDto, RegistrationApiProxy, RegistrationDto, RegistrationParticipantDto } from '../../api';
import { track } from '../../main/actions';
import { State } from '../../main/state';
import { throwIfUndefined } from '../../utils';
import { ApplicantState, AvailabilityState, hasAllForRegistrationParticipant, ParticipantState } from '../state';

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

export const PARTICIPAENT_CHANGE = 'PARTICIPAENT_CHANGE';

export interface ParticipantChangeAction extends Action {
    participantIndex: number;
    change: Partial<ParticipantState>;
}

export const changeParticipant = (partipiantIndex: number, change: Partial<ParticipantState>) => (dispatch: Dispatch) => {
    const action: ParticipantChangeAction = { type: PARTICIPAENT_CHANGE, participantIndex: partipiantIndex, change: change };
    dispatch(action);
}

export const PARTICIPANT_SELECT_COURSE = 'PARTICIPANT_SELECT_COURSE';

export interface ParticipantSelectCourseAction extends Action {
    selectedCoursesByParticipant: { [participantId: string]: { identifier: number; startDate: Date; } };
}

export const selectCoursesForParticipants = (selectedCoursesByParticipant: { [participantId: string]: { identifier: number; startDate: Date; } }) => (dispatch: Dispatch) => {
    const action: ParticipantSelectCourseAction = { type: PARTICIPANT_SELECT_COURSE, selectedCoursesByParticipant };
    dispatch(action);
}

export const REGISTRATION_SHOW_ALL_VALIDATION_ERRORS = 'REGISTRATION_SHOW_ALL_VALIDATION_ERRORS';

export interface RegistrationShowAllValidationErrorsAction extends Action {
    showAllValidationErrors: boolean;
}

export const showAllValidationErrors = (showAllValidationErrors: boolean) => (dispatch: Dispatch) => {
    const action: RegistrationShowAllValidationErrorsAction = { type: REGISTRATION_SHOW_ALL_VALIDATION_ERRORS, showAllValidationErrors };
    dispatch(action);
}

export const REGISTRATION_LOADED = 'REGISTRATION_LOADED';

export interface RegistrationLoadedAction extends Action {
    registration: RegistrationDto;
}

export const loadRegistration = (id: string) => (dispatch: Dispatch) => {
    const apiProxy = new RegistrationApiProxy();
    track(apiProxy.getRegistration(id), dispatch)
        .then(r => {
            const action: RegistrationLoadedAction = { type: REGISTRATION_LOADED, registration: r };
            dispatch(action);
        });
}

export const REGISTRATION_UNSET = 'REGISTRATION_UNSET';

export interface RegistrationUnsetAction extends Action {
}

export const unsetRegistration = () => (dispatch: Dispatch) => {
    const action: RegistrationUnsetAction = { type: REGISTRATION_UNSET };
    dispatch(action);
}

export const REGISTRATION_SUBMIT = 'REGISTRATION_SUBMITTED';

export interface RegistrationSubmittedAction extends Action {
    registrationId: string;
    applicantId: string;
}

export const submitOrUpdateRegistration = (onSubmittedOrUpdated?: (registrationId: string) => void) => (dispatch: Dispatch, getState: () => State) => {
    const apiProxy = new RegistrationApiProxy();
    const registrationState = getState().registration;

    const registrationDto = new RegistrationDto();
    registrationDto.registrationId = registrationState.id ? registrationState.id : undefined;
    registrationDto.applicantId = registrationState.applicant.id ? registrationState.applicant.id : undefined;
    registrationDto.surname = registrationState.applicant.surname;
    registrationDto.givenname = registrationState.applicant.givenname;
    registrationDto.phoneNumber = registrationState.applicant.phoneNumber;
    registrationDto.residence = registrationState.applicant.residence;
    registrationDto.availableFrom = throwIfUndefined(registrationState.availability.availableFrom);
    registrationDto.availableTo = throwIfUndefined(registrationState.availability.availableTo);
    registrationDto.status = registrationState.status;
    registrationDto.participants = registrationState.participants
        .map(p => {
            const partipiantDto = new RegistrationParticipantDto();
            if (p.id && p.rowVersion) {
                partipiantDto.id = p.id;
                partipiantDto.rowVersion = p.rowVersion;
            }
            partipiantDto.name = p.name;
            partipiantDto.courseType = throwIfUndefined(p.courseType);
            partipiantDto.discipline = throwIfUndefined(p.discipline);
            partipiantDto.niveauId = throwIfUndefined(p.niveauId);
            partipiantDto.ageGroup = p.ageGroup ? parseInt(p.ageGroup) : undefined;
            partipiantDto.language = registrationState.applicant.language;

            return partipiantDto;
        });

    if (registrationDto.registrationId) {
        track(apiProxy.update(registrationDto), dispatch).then(r => {
            const action: RegistrationSubmittedAction = { type: REGISTRATION_SUBMIT, applicantId: r.applicantId, registrationId: r.registrationId };
            dispatch(action);

            if (onSubmittedOrUpdated) {
                onSubmittedOrUpdated(action.registrationId);
            }
        });
    }
    else {
        track(apiProxy.register(registrationDto), dispatch).then(r => {
            const action: RegistrationSubmittedAction = { type: REGISTRATION_SUBMIT, applicantId: r.applicantId, registrationId: r.registrationId };
            dispatch(action);

            if (onSubmittedOrUpdated) {
                onSubmittedOrUpdated(action.registrationId);
            }
        });
    }
}

export const REGISTRATION_COMMITTED = 'REGISTRATION_COMMITTED';

export interface RegistrationCommittedAction extends Action {
}

export const commitRegistration = (onCommitted?: () => void) => (dispatch: Dispatch, getState: () => State) => {
    const apiProxy = new RegistrationApiProxy();
    const registrationState = getState().registration;

    const commitRegistrationDto = new CommitRegistrationDto();
    commitRegistrationDto.registrationId = throwIfUndefined(registrationState.id);
    commitRegistrationDto.payment = "NOOP";
    commitRegistrationDto.participants = registrationState.participants
        .filter(hasAllForRegistrationParticipant)
        .map(p => {
            const commitPartipiantDto = new CommitRegistrationParticipantDto();
            commitPartipiantDto.id = throwIfUndefined(p.id);
            commitPartipiantDto.rowVersion = throwIfUndefined(p.rowVersion);
            commitPartipiantDto.ageGroup = parseInt(p.ageGroup);
            commitPartipiantDto.language = throwIfUndefined(registrationState.applicant.language);
            commitPartipiantDto.courseIdentifier = throwIfUndefined(p.committing).courseIdentifier;
            commitPartipiantDto.courseStartDate = throwIfUndefined(p.committing).courseStartDate;

            return commitPartipiantDto;
        });

    track(apiProxy.commitRegistration(commitRegistrationDto), dispatch).then(r => {
        const action: RegistrationCommittedAction = { type: REGISTRATION_SUBMIT };
        dispatch(action);

        if (onCommitted) {
            onCommitted();
        }
    });
}

export const REGISTRATION_POSSIBLE_COURSES_LOADED = 'REGISTRATION_POSSIBLE_COURSES_LOADED';

export interface RegistrationPossibleCoursesLoadedAction extends Action {
    possibleCourses: PossibleCourseDto[];
}

export const loadPossibleCourses = () => (dispatch: Dispatch, getState: () => State) => {
    const apiProxy = new RegistrationApiProxy();
    const registrationId = throwIfUndefined<string>(getState().registration.id);
    track(apiProxy.possibleCourseDatesPerParticipant(registrationId), dispatch).then(r => {
        const action: RegistrationPossibleCoursesLoadedAction = { type: REGISTRATION_POSSIBLE_COURSES_LOADED, possibleCourses: r }
        dispatch(action);
    });
}
