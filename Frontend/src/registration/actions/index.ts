import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { ApplicantState, AvailabilityState, PartipiantState, hasAllRegistrationProperties } from '../state';
import { RegistrationApiProxy, RegistrationDto, RegistrationParticipantDto, PossibleCourseDto, CommitRegistrationDto, CommitRegistrationParticipantDto } from '../../api';
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
    selectedCoursesByParticipant: { [participantId: string]: { identifier: number; startDate: Date; } };
}

export const selectCoursesForParticipants = (selectedCoursesByParticipant: { [participantId: string]: { identifier: number; startDate: Date; } }) => (dispatch: Dispatch) => {
    const action: PartipientSelectCourseAction = { type: PARTIPIENT_SELECT_COURSE, selectedCoursesByParticipant };
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
    registrationDto.preferSimultaneousCourseExecutionForPartipiants = registrationState.applicant.preferSimultaneousCourseExecutionForPartipiants;
    registrationDto.availableFrom = throwIfUndefined(registrationState.availability.availableFrom);
    registrationDto.availableTo = throwIfUndefined(registrationState.availability.availableTo);
    registrationDto.status = registrationState.status;
    registrationDto.participants = registrationState.partipiants
        .filter(hasAllRegistrationProperties)
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
        apiProxy.update(registrationDto).then(r => {
            const action: RegistrationSubmittedAction = { type: REGISTRATION_SUBMIT, applicantId: r.applicantId, registrationId: r.registrationId };
            dispatch(action);

            if (onSubmittedOrUpdated) {
                onSubmittedOrUpdated(action.registrationId);
            }
        });
    }
    else {
        apiProxy.register(registrationDto).then(r => {
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
    commitRegistrationDto.participants = registrationState.partipiants
        .filter(hasAllRegistrationProperties)
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

    apiProxy.commitRegistration(commitRegistrationDto).then(r => {
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
    apiProxy.possibleCourseDatesPerPartipiant(throwIfUndefined<string>(getState().registration.id)).then(r => {
        const action: RegistrationPossibleCoursesLoadedAction = { type: REGISTRATION_POSSIBLE_COURSES_LOADED, possibleCourses: r }
        dispatch(action);
    });
}
