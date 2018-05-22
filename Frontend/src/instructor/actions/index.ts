import { Dispatch } from "react-redux";
import { Action } from "redux";
import { InstructorApiProxy, CourseDto } from "../../api";
import { CourseDateVisualizer } from "../../registration/components/CourseDatesVisualizer";
import { State } from "../../main/state";

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
    apiProxy.getMyCourses(instructorId).then(r => {
        const action: CoursesLoadedAction = { type: COURSES_LOADED, courses: r };
        dispatch(action);
    })
}
