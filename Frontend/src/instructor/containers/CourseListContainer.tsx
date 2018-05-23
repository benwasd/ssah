import { connect } from 'react-redux';

import { State } from '../../main/state';
import { loadCourses } from '../actions';
import { CourseList, CourseListProps } from '../components/CourseList';

export const CourseListContainer = connect(
    (state: State): Partial<CourseListProps> => {
        return {
            courses: state.instructor.courses
        }
    },
    {
        loadCourses
    }
)(CourseList)
