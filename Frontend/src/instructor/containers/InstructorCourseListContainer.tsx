import { connect } from 'react-redux';

import { State } from '../../state';
import { loadCourses } from '../actions';
import { InstructorCourseList, InstructorCourseListProps } from '../components/InstructorCourseList';

export const InstructorCourseListContainer = connect(
    (state: State): Partial<InstructorCourseListProps> => {
        return {
            courses: state.instructor.courses
        }
    },
    {
        loadCourses
    }
)(InstructorCourseList)
