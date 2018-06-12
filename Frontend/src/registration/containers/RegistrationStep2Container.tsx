import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../main/state';
import { selectCoursesForParticipants } from '../actions';
import { CourseSelection, CourseSelectionProps, SelectionMap } from '../components/CourseSelection';

const CourseSelectionContainer = connect(
    (state: State): Partial<CourseSelectionProps> => {
        return {
            participants: state.registration.participants,
            possibleCourses: state.registration.possibleCourses,
            showAllValidationErrors: state.registration.showAllValidationErrors
        }
    },
    {
        selectCoursesForParticipants
    }
)(CourseSelection)

export class RegistrationStep2Container extends React.Component {
    render() {
        return (<>
            <CourseSelectionContainer/>
        </>);
    }
}
