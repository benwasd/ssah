import { combineReducers, Reducer, Action } from 'redux';

import { APPLICANT_CHANGE, ApplicantChangeAction, AVAILABILITY_CHANGE, AvailabilityChangeAction } from '../actions';
import { ApplicantState, AvailabilityState, PartipiantState } from '../state';
import { CourseType, Discipline } from '../../api';

const handleApplicant: Reducer<ApplicantState, Action> = (state, action) => {
    if (state === undefined) {
        return { givenname: "", surname: "", residence: "", phoneNumber: "" };
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

const handlePartipiants: Reducer<PartipiantState, Action> = (state, action) => {
    if (state === undefined) {
        return { name: "", courseType: CourseType.Group, discipline: Discipline.Ski, niveauId: 0 };
    }

    console.log("handlePartipiants", action);

    switch (action.type) {
        default: 
            return state;
    }
}

export interface ReducerTree {
    applicant: Reducer<ApplicantState, Action>;
    availability: Reducer<AvailabilityState, Action>;
    partipiants: Reducer<PartipiantState, Action>;
}

export const reducer = combineReducers(<ReducerTree>{
    applicant: handleApplicant,
    availability: handleAvailability,
    partipiants: handlePartipiants
})
