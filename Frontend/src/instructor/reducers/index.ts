import { Action, combineReducers, Reducer } from 'redux';

import { CourseDto } from '../../api';
import { noopReducer, noopAction } from '../../utils';
import { InstructorState } from '../state';
import { COURSES_LOADED, CoursesLoadedAction } from '../actions';

const handleCourses: Reducer<CourseDto[], Action> = (state, action) => {
    if (state === undefined) {
        return [];
    }

    switch (action.type) {
        case COURSES_LOADED: 
            const loadedAction = action as CoursesLoadedAction;
            return loadedAction.courses;
        default:
            return state;
    }
}

const handleInstructor: Reducer<InstructorState, Action> = (state, action) => {
    if (state === undefined) {
        return { instructorId: null, name: null, courses: handleCourses(undefined, noopAction()) }
    }

    switch (action.type) {
        default:
            return state;
    }
}

export interface InstructorReducerTree {
    instructorId: Reducer<string | null, Action>;
    name: Reducer<string | null, Action>;
    courses: Reducer<CourseDto[], Action>;
}

export const reducer = combineReducers(<InstructorReducerTree>{
    instructorId: noopReducer(null),
    name: noopReducer(null),
    courses: handleCourses
});

export const rootReducer = handleInstructor;
