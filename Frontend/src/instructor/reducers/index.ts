import { Action, combineReducers, Reducer } from 'redux';

import { CourseDto } from '../../api';
import { noopReducer, noopAction } from '../../utils';
import { InstructorState } from '../state';
import { COURSES_LOADED, CoursesLoadedAction, INSTRUCTOR_LOGIN, InstructorLoginAction } from '../actions';

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
        return { instructorId: null, instructorName: null, courses: handleCourses(undefined, noopAction()) }
    }

    switch (action.type) {
        case INSTRUCTOR_LOGIN: 
            const loginAction = action as InstructorLoginAction;
            return {
                instructorId: loginAction.instructorId,
                instructorName: loginAction.instructorName,
                courses: []
            };

        default:
            return state;
    }
}

export interface InstructorReducerTree {
    instructorId: Reducer<string | null, Action>;
    instructorName: Reducer<string | null, Action>;
    courses: Reducer<CourseDto[], Action>;
}

export const reducer = combineReducers(<InstructorReducerTree>{
    instructorId: noopReducer(null),
    instructorName: noopReducer(null),
    courses: handleCourses
});

export const rootReducer = handleInstructor;
