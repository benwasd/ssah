import { combineReducers, Reducer, Action } from 'redux';
import update from 'immutability-helper';

import { CourseType, Discipline, RegistrationStatus, PossibleCourseDto } from '../../api';
import { noopAction, noopReducer } from '../../utils';
import { 
    APPLICANT_CHANGE, ApplicantChangeAction, 
    AVAILABILITY_CHANGE, AvailabilityChangeAction, 
    PARTICIPAENT_CHANGE, ParticipantChangeAction, 
    REGISTRATION_SHOW_ALL_VALIDATION_ERRORS, RegistrationShowAllValidationErrorsAction,
    REGISTRATION_LOADED, RegistrationLoadedAction,
    PARTICIPANT_SELECT_COURSE, ParticipantSelectCourseAction,
    REGISTRATION_POSSIBLE_COURSES_LOADED, RegistrationPossibleCoursesLoadedAction, REGISTRATION_UNSET,
} from '../actions';
import { ApplicantState, AvailabilityState, ParticipantState, RegistrationState } from '../state';

const handleApplicant: Reducer<ApplicantState, Action> = (state, action) => {
    if (state === undefined) {
        return { givenname: "", surname: "", residence: "", phoneNumber: "" };
    }
    
    switch (action.type) {
        case APPLICANT_CHANGE:
            const changeAction = action as ApplicantChangeAction;
            return Object.assign({}, state, changeAction.change);
        default:
            return state;
    }
}

const handleAvailability: Reducer<AvailabilityState, Action> = (state, action) => {
    if (state === undefined) {
        return { availableFrom: undefined, availableTo: undefined };
    }
    
    switch (action.type) {
        case AVAILABILITY_CHANGE:
            const changeAction = action as AvailabilityChangeAction;
            return Object.assign({}, state, changeAction.change);
        default:
            return state;
    }
}

const handleParticipants: Reducer<ParticipantState[], Action> = (state, action) => {
    if (state === undefined) {
        return [];
    }

    let newState;
    switch (action.type) {
        case PARTICIPAENT_CHANGE:
            const changeAction = action as ParticipantChangeAction;

            if (changeAction.participantIndex >= state.length) {
                newState = state.concat([ Object.assign({ name: "", ageGroup: "", courseType: CourseType.Group }, changeAction.change) ]);
            }
            else {
                newState = update(state, { [changeAction.participantIndex]: { $merge: changeAction.change } });
            }

            return newState;
        case PARTICIPANT_SELECT_COURSE:
            const selectCourseAction = action as ParticipantSelectCourseAction;
            
            newState = state;
            state.forEach((participant, participantIndex) => {
                let committing: { courseIdentifier: number, courseStartDate: Date } | null = null;
                
                const courseSelection = selectCourseAction.selectedCoursesByParticipant[participant.id as any];
                if (courseSelection) {
                    committing = { courseIdentifier: courseSelection.identifier, courseStartDate: courseSelection.startDate };
                }

                newState = update(newState, { [participantIndex]: { committing: { $set: committing } } });
            });

            return newState;
        default: 
            return state;
    }
}

const handlePossibleCourses: Reducer<PossibleCourseDto[], Action> = (state, action) => {
    if (state === undefined) {
        return [];
    }

    switch (action.type) {
        case REGISTRATION_POSSIBLE_COURSES_LOADED:
            const loadedAction = action as RegistrationPossibleCoursesLoadedAction;
            return loadedAction.possibleCourses;
        default:
            return state;
    }
}

const handleRegistration: Reducer<RegistrationState, Action> = (state, action) => {
    if (state == undefined) {
        return {
            id: null,
            status: RegistrationStatus.Registration,
            showAllValidationErrors: false,
            applicant: handleApplicant(undefined, noopAction()),
            availability: handleAvailability(undefined, noopAction()),
            participants: handleParticipants(undefined, noopAction()),
            possibleCourses: handlePossibleCourses(undefined, noopAction())
        };
    }

    switch (action.type) {
        case REGISTRATION_SHOW_ALL_VALIDATION_ERRORS: 
            const showAllValidationErrorsAction = action as RegistrationShowAllValidationErrorsAction;
            return update(state, { $merge: { showAllValidationErrors: showAllValidationErrorsAction.showAllValidationErrors } });
        case REGISTRATION_UNSET:
            return {
                id: null,
                status: RegistrationStatus.Registration,
                showAllValidationErrors: false,
                applicant: handleApplicant(undefined, noopAction()),
                availability: handleAvailability(undefined, noopAction()),
                participants: handleParticipants(undefined, noopAction()),
                possibleCourses: handlePossibleCourses(undefined, noopAction())
            };
        case REGISTRATION_LOADED:
            const loadedAction = action as RegistrationLoadedAction;
            return {
                id: loadedAction.registration.registrationId ? loadedAction.registration.registrationId : null,
                status: loadedAction.registration.status,
                showAllValidationErrors: false,
                applicant: {
                    id: loadedAction.registration.applicantId,
                    surname: loadedAction.registration.surname,
                    givenname: loadedAction.registration.givenname,
                    residence: loadedAction.registration.residence,
                    phoneNumber: loadedAction.registration.phoneNumber,
                    language: loadedAction.registration.participants.length > 0 ? loadedAction.registration.participants[0].language : undefined
                },
                availability: {
                    availableFrom: loadedAction.registration.availableFrom,
                    availableTo: loadedAction.registration.availableTo
                },
                participants: loadedAction.registration.participants.map(p => {
                    return {
                        id: p.id,
                        rowVersion: p.rowVersion,
                        name: p.name,
                        courseType: p.courseType,
                        discipline: p.discipline,
                        niveauId: p.niveauId,
                        ageGroup: p.ageGroup ? p.ageGroup.toString() : ""
                    }
                }),
                possibleCourses: []
            }
        default:
            return state;
    }
}

export interface RegistrationReducerTree {
    id: Reducer<string | null, Action>;
    status: Reducer<RegistrationStatus, Action>;
    showAllValidationErrors: Reducer<boolean, Action>;
    applicant: Reducer<ApplicantState, Action>;
    availability: Reducer<AvailabilityState, Action>;
    participants: Reducer<ParticipantState[], Action>;
    possibleCourses: Reducer<PossibleCourseDto[], Action>;
}

export const reducer = combineReducers(<RegistrationReducerTree>{
    id: noopReducer(null),
    status: noopReducer(RegistrationStatus.Registration),
    showAllValidationErrors: noopReducer(false),
    applicant: handleApplicant,
    availability: handleAvailability,
    participants: handleParticipants,
    possibleCourses: handlePossibleCourses
});

export const rootReducer = handleRegistration;
