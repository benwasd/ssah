import { combineReducers, Reducer, Action } from 'redux';

import { APPLICANT_CHANGE, ApplicantChangeAction, AVAILABILITY_CHANGE, AvailabilityChangeAction, PARTIPIENT_CHANGE, PartipientChangeAction, REGISTRATION_LOADED, RegistrationLoadedAction, PARTIPIENT_SELECT_COURSE, REGISTRATION_POSSIBLE_COURSES_LOADED, RegistrationPossibleCoursesLoadedAction, PartipientSelectCourseAction } from '../actions';
import { ApplicantState, AvailabilityState, PartipiantState, RegistrationState, hasAllRegistrationProperties } from '../state';
import { CourseType, Discipline, RegistrationStatus, PossibleCourseDto } from '../../api';

import update from 'immutability-helper';

function noopReducer<T>(defaultState: T): Reducer<T, Action> {
    return (s: T, a: Action) => {
        if (s === undefined) {
            return defaultState;
        }

        return s;
    }
}

function noopAction(): Action {
    return { type: "" }
}

const handleApplicant: Reducer<ApplicantState, Action> = (state, action) => {
    if (state === undefined) {
        return { givenname: "", surname: "", residence: "", phoneNumber: "", preferSimultaneousCourseExecutionForPartipiants: true };
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
        return {};
    }
    
    switch (action.type) {
        case AVAILABILITY_CHANGE:
            const changeAction = action as AvailabilityChangeAction;
            return Object.assign({}, state, changeAction.change);
        default:
            return state;
    }
}

const handlePartipiants: Reducer<PartipiantState[], Action> = (state, action) => {
    if (state === undefined) {
        return [ 
            { name: "", ageGroup: "" },
            { name: "", ageGroup: "" }
        ];
    }

    switch (action.type) {
        case PARTIPIENT_CHANGE:
            const changeAction = action as PartipientChangeAction;

            let newState = update(state, { [changeAction.partipiantIndex]: { $merge: changeAction.change } });
            if (newState.every(p => hasAllRegistrationProperties(p))) {
                newState = newState.concat({ name: "", ageGroup: "" });
            }

            return newState as PartipiantState[];
        case PARTIPIENT_SELECT_COURSE:
            const selectCourseAction = action as PartipientSelectCourseAction;
            const x = selectCourseAction.selectedCourses[0];

            let participantIndex = state.findIndex(p => p.id === x.participantId);
            let newState2 = update(state, { [participantIndex]: { $merge: { commiting: { courseIdentifier: x.identifier, courseStartDate: x.startDate } } } });
            console.log(newState2);
            
            return newState2 as PartipiantState[];

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
            applicant: handleApplicant(undefined, noopAction()),
            availability: handleAvailability(undefined, noopAction()),
            partipiants: handlePartipiants(undefined, noopAction()),
            possibleCourses: handlePossibleCourses(undefined, noopAction())
        };
    }

    switch (action.type) {
        case REGISTRATION_LOADED:
            const loadedAction = action as RegistrationLoadedAction;

            return {
                id: loadedAction.registration.registrationId ? loadedAction.registration.registrationId : null,
                status: loadedAction.registration.status,
                applicant: {
                    surname: loadedAction.registration.surname,
                    givenname: loadedAction.registration.givenname,
                    residence: loadedAction.registration.residence,
                    phoneNumber: loadedAction.registration.phoneNumber,
                    language: loadedAction.registration.participants.length > 0 ? loadedAction.registration.participants[0].language : undefined,
                    preferSimultaneousCourseExecutionForPartipiants: loadedAction.registration.preferSimultaneousCourseExecutionForPartipiants
                },
                availability: {
                    availableFrom: loadedAction.registration.availableFrom,
                    availableTo: loadedAction.registration.availableTo
                },
                partipiants: loadedAction.registration.participants.map(p => {
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
    applicant: Reducer<ApplicantState, Action>;
    availability: Reducer<AvailabilityState, Action>;
    partipiants: Reducer<PartipiantState[], Action>;
    possibleCourses: Reducer<PossibleCourseDto[], Action>;
}

export const reducer = combineReducers(<RegistrationReducerTree>{
    id: noopReducer(null),
    status: noopReducer(RegistrationStatus.Registration),
    applicant: handleApplicant,
    availability: handleAvailability,
    partipiants: handlePartipiants,
    possibleCourses: handlePossibleCourses
})

export const rootReducer = handleRegistration;
