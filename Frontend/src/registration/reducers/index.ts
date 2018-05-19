import { combineReducers, Reducer, Action } from 'redux';

import { APPLICANT_CHANGE, ApplicantChangeAction, AVAILABILITY_CHANGE, AvailabilityChangeAction, PARTIPIENT_CHANGE, PartipientChangeAction, REGISTRATION_LOADED } from '../actions';
import { ApplicantState, AvailabilityState, PartipiantState } from '../state';
import { CourseType, Discipline } from '../../api';

import update from 'immutability-helper';

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
            const l = action as PartipientChangeAction;
            let newState = update(state, { [l.partipiantIndex]: { $merge: l.change } });

            if (newState.every(p => hasAllRegistrationProperties(p))) {
                newState = newState.concat({ name: "" });
            }

            return newState as PartipiantState[];

        case REGISTRATION_LOADED:
            console.log(action);

        default: 
            return state;
    }

    function hasAllRegistrationProperties(p: PartipiantState) {
        return p.name != "" && p.niveauId != null && p.courseType != null && p.discipline != null;
    }
}

export interface ReducerTree {
    applicant: Reducer<ApplicantState, Action>;
    availability: Reducer<AvailabilityState, Action>;
    partipiants: Reducer<PartipiantState[], Action>;
}

export const reducer = combineReducers(<ReducerTree>{
    applicant: handleApplicant,
    availability: handleAvailability,
    partipiants: handlePartipiants
})
