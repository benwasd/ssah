import { Dispatch } from "react-redux";
import { Action } from "redux";
import { InstructorApiProxy, CourseDto } from "../../api";
import { CourseDateVisualizer } from "../../registration/components/CourseDatesVisualizer";

export const COURSES_LOADED = 'COURSES_LOADED';

export interface CoursesLoadedAction extends Action {
    courses: CourseDto[];
}

export const loadCourses = (instructorId: string) => (dispatch: Dispatch) => {
    const apiProxy = new InstructorApiProxy();
    apiProxy.getMyCourses(instructorId).then(r => {
        const action: CoursesLoadedAction = { type: COURSES_LOADED, courses: r };
        dispatch(action);
    })
}
