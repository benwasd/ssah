import * as moment from 'moment';
import { Dispatch } from 'react-redux';
import { Action } from 'redux';

import { CloseCourseDto, CourseDto, CourseParticipantFeedbackDto, InstructorApiProxy } from '../../api';
import { track } from '../../main/actions';
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
        throw new Error("Instructor is not set, login first.");
    }
    
    const apiProxy = new InstructorApiProxy();
    const from = moment().startOf('day').add(-7, 'days').toDate();
    const to = moment().startOf('day').add(14, 'days').toDate();
    track(apiProxy.getMyCourses(instructorId, from, to), dispatch).then(r => {
        const action: CoursesLoadedAction = { type: COURSES_LOADED, courses: r };
        dispatch(action);
    });
}

export const COURSE_LOADED = 'COURSE_LOADED';

export interface CourseLoadedAction extends Action {
    course: CourseDto;
}

export const loadCourse = (courseId: string) => (dispatch: Dispatch, getState: () => State) => {
    const instructorId = getState().instructor.instructorId;
    if (!instructorId) {
        throw new Error("Instructor is not set, login first.");
    }
    
    const apiProxy = new InstructorApiProxy();
    track(apiProxy.getMyCourse(instructorId, courseId), dispatch).then(r => {
        const from = moment().startOf('day').add(-7, 'days').toDate();
        const to = moment().startOf('day').add(14, 'days').toDate();
        if (from <= r.startDate && r.startDate <= to) {
            const action: CourseLoadedAction = { type: COURSE_LOADED, course: r };
            dispatch(action);
        }
    });
}

export const COURSE_CLOSED = 'COURSE_CLOSED';

export interface CourseClosedAction extends Action {
    closedCourse: CloseCourseDto;
}

export const closeCourse = (courseId: string, courseRowVersion: string, participantsFeedback: CourseParticipantFeedbackDto[]) => (dispatch: Dispatch, getState: () => State) => {
    const instructorId = throwIfUndefined(getState().instructor.instructorId);
    const closeCourseDto = new CloseCourseDto();
    closeCourseDto.id = courseId;
    closeCourseDto.rowVersion = courseRowVersion;
    closeCourseDto.participants = participantsFeedback;

    const apiProxy = new InstructorApiProxy();
    track(apiProxy.closeCourse(instructorId, closeCourseDto), dispatch).then(() => {
        const action: CourseClosedAction = { type: COURSE_CLOSED, closedCourse: closeCourseDto };
        dispatch(action);
    });
}
