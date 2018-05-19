import { combineReducers, Reducer, Action } from 'redux';

import { APPLICANT_CHANGE, ApplicantChangeAction, AVAILABILITY_CHANGE, AvailabilityChangeAction, PARTIPIENT_CHANGE, PartipientChangeAction, REGISTRATION_LOADED, RegistrationLoadedAction } from '../actions';
import { ApplicantState, AvailabilityState, PartipiantState, RegistrationState } from '../state';
import { CourseType, Discipline } from '../../api';

import update from 'immutability-helper';

function noopReducer<T>(defaultState: T): Reducer<T, Action> {
    return (s: T, a: Action) => {
        if (s === undefined) {
            return defaultState;
        }

        return s;
    }
}

const handleApplicant: Reducer<ApplicantState, Action> = (state, action) => {
    if (state === undefined) {
        return { givenname: "", surname: "", residence: "", phoneNumber: "", preferSimultaneousCourseExecutionForPartipiants: true };
    }
    
    switch (action.type) {
        case APPLICANT_CHANGE: 
            return Object.assign({}, state, (<ApplicantChangeAction>action).change);
        default:
            return state;
    }
}

const handleAvailability: Reducer<AvailabilityState, Action> = (state, action) => {
    if (state === undefined) {
        return {  availableFrom: null, availableTo: null };
    }
    
    switch (action.type) {
        case AVAILABILITY_CHANGE:
            return Object.assign({}, state, (<AvailabilityChangeAction>action).change);
        default:
            return state;
    }
}

const handlePartipiants: Reducer<PartipiantState[], Action> = (state, action) => {
    if (state === undefined) {
        return [ { name: "" }, { name: "" }, { name: "" } ];
    }

    switch (action.type) {
        case PARTIPIENT_CHANGE:
            const changeAction = action as PartipientChangeAction;
            let newState = update(state, { [changeAction.partipiantIndex]: { $merge: changeAction.change } });

            if (newState.every(p => hasAllRegistrationProperties(p))) {
                newState = newState.concat({ name: "" });
            }

            return newState as PartipiantState[];



        default: 
            return state;
    }

    function hasAllRegistrationProperties(p: PartipiantState) {
        return p.name != "" && p.niveauId != null && p.courseType != null && p.discipline != null;
    }
}

const handleRegistration: Reducer<RegistrationState, Action> = (state, action) => {
    if (state == undefined) {
        return {
            applicant: handleApplicant(undefined, null),
            availability: handleAvailability(undefined, null),
            partipiants: handlePartipiants(undefined, null)
        };
    }

    switch (action.type) {
        case REGISTRATION_LOADED:
            const loadedAction = action as RegistrationLoadedAction;

            return {
                id: loadedAction.registration.registrationId,
                applicant: {
                    surname: loadedAction.registration.surname,
                    givenname: loadedAction.registration.givenname,
                    residence: loadedAction.registration.residence,
                    phoneNumber: loadedAction.registration.phoneNumber,
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
                        niveauId: p.niveauId
                    }
                })
            }
        default: 
            return state;
    }
}

export interface RegistrationReducerTree {
    applicant: Reducer<ApplicantState, Action>;
    availability: Reducer<AvailabilityState, Action>;
    partipiants: Reducer<PartipiantState[], Action>;
}

export const reducer = combineReducers(<RegistrationReducerTree>{
    id: noopReducer(null),
    applicant: handleApplicant,
    availability: handleAvailability,
    partipiants: handlePartipiants
})

export const rootReducer = handleRegistration;
