import { Action, combineReducers, Reducer } from 'redux';
import update from 'immutability-helper';

import { CourseDto } from '../../api';
import { noopAction, noopReducer } from '../../utils';
import {
    COURSES_LOADED, CoursesLoadedAction,
    COURSE_LOADED, CourseLoadedAction,
    INSTRUCTOR_LOGIN, InstructorLoginAction
} from '../actions';
import { InstructorState } from '../state';

const handleCourses: Reducer<CourseDto[], Action> = (state, action) => {
    if (state === undefined) {
        return [];
    }

    switch (action.type) {
        case COURSES_LOADED: 
            const allLoadedAction = action as CoursesLoadedAction;
            return allLoadedAction.courses;

        case COURSE_LOADED:
            const loadedAction = action as CourseLoadedAction;
            
            const courseIndex = state.findIndex(c => c.id === loadedAction.course.id);
            let newState;
            if (courseIndex >= 0) {
                newState = update(state, { [courseIndex]: { $set: loadedAction.course } });
            }
            else {
                newState = state.concat(loadedAction.course);
            }

            return newState;
        default:
            return state;
    }
}

const handleInstructor: Reducer<InstructorState, Action> = (state, action) => {
    if (state === undefined) {
        return { instructorId: undefined, instructorName: undefined, courses: handleCourses(undefined, noopAction()) }
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
    instructorId: noopReducer("AEEF01D4-14DE-49D1-980A-004AF5135C30"),
    instructorName: noopReducer("Martina Sägesser"),
    courses: handleCourses
});

export const rootReducer = handleInstructor;
