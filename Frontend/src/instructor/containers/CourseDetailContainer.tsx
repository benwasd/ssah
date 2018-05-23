import { connect } from 'react-redux';

import { State } from '../../main/state';
import { closeCourse } from '../actions';
import { CourseDetail, CourseDetailProps } from '../components/CourseDetail';

export const CourseDetailContainer = connect(
    (state: State, ownProps: CourseDetailProps): Partial<CourseDetailProps> => {
        return {
            course: state.instructor.courses.find(c => ownProps.match.params.id === c.id)
        }
    },
    {
        closeCourse
    }
)(CourseDetail)
