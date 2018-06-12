import { connect } from 'react-redux';

import { State } from '../../main/state';
import { loadCourses } from '../actions';
import { CourseList, CourseListProps } from '../components/CourseList';

export const CourseListContainer = connect(
    (state: State): Partial<CourseListProps> => {
        return {
            loggedInInstructorName: state.instructor.instructorName,
            courses: state.instructor.courses
        }
    },
    {
        loadCourses
    }
)(CourseList)
