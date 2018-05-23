import * as moment from 'moment';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { CloseCourseDto, CourseDto, CourseParticipantFeedbackDto, InstructorApiProxy } from '../../api';
import { State } from '../../main/state';
import { throwIfUndefined } from '../../utils';

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

export const COURSE_CLOSED = 'COURSE_CLOSED';

export interface CourseClosedAction extends Action {
    closedCourse: CloseCourseDto;
}

export const closeCourse = (courseId: string, courseRowVersion: string, participantsFeedback: CourseParticipantFeedbackDto[]) => (dispatch: Dispatch, getState: () => State) => {
    const closeCourseDto = new CloseCourseDto();
    closeCourseDto.id = courseId;
    closeCourseDto.rowVersion = courseRowVersion;
    closeCourseDto.participants = participantsFeedback;

    const apiProxy = new InstructorApiProxy();
    apiProxy.closeCourse(throwIfUndefined(getState().instructor.instructorId), closeCourseDto).then(() => {
        const action: CourseClosedAction = { type: COURSE_CLOSED, closedCourse: closeCourseDto };
        dispatch(action);
    })
}
