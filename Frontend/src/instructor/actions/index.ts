import * as moment from 'moment';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { CourseDto, InstructorApiProxy } from '../../api';
import { State } from '../../main/state';

export const INSTRUCTOR_LOGIN = 'INSTRUCTOR_LOGIN';

export interface InstructorLoginAction extends Action {
    instructorId: string;
    instructorName: string;
}

export const loginInstructor = (instructorId: string, instructorName: string) => (dispatch: Dispatch) => {
    const action: InstructorLoginAction = { type: INSTRUCTOR_LOGIN, instructorId, instructorName };
    dispatch(action);
}

export const COURSES_LOADED = 'COURSES_LOADED';

export interface CoursesLoadedAction extends Action {
    courses: CourseDto[];
}

export const loadCourses = () => (dispatch: Dispatch, getState: () => State) => {
    const instructorId = getState().instructor.instructorId;
    if (!instructorId) {
        throw new Error("Instructor is not set, login first");
    }
    
    const apiProxy = new InstructorApiProxy();
    const from = moment().startOf('day').add(-7, 'days').toDate();
    const to = moment().startOf('day').add(14, 'days').toDate();
    apiProxy.getMyCourses(instructorId, from, to).then(r => {
        const action: CoursesLoadedAction = { type: COURSES_LOADED, courses: r };
        dispatch(action);
    });
}

export const COURSE_RELOAD = 'COURSE_RELOAD';

export interface CourseReloadedAction extends Action {
    course: CourseDto;
}

export const reloadCourse = (instructorId: string, courseId: string) => (dispatch: Dispatch, getState: () => State) => {
    console.log("RELOAD COURSE", instructorId, courseId);
    const currentInstructorId = getState().instructor.instructorId;
    if (currentInstructorId == null || instructorId == null || currentInstructorId.toUpperCase() != instructorId.toUpperCase()) {
        return;
    }
    
    const apiProxy = new InstructorApiProxy();
    apiProxy.getMyCourse(instructorId, courseId).then(r => {
        const from = moment().startOf('day').add(-7, 'days').toDate();
        const to = moment().startOf('day').add(14, 'days').toDate();
        if (from <= r.startDate && r.startDate <= to) {
            const action: CourseReloadedAction = { type: COURSE_RELOAD, course: r };
            dispatch(action);
        }
    });
}
