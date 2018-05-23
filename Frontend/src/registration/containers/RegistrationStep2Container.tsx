import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../main/state';
import { applicantChange, selectCoursesForParticipants, loadPossibleCourses } from '../actions';
import { ApplicantProps } from '../components/Applicant';
import { CourseSelection, CourseSelectionProps, SelectionMap } from '../components/CourseSelection';

const CourseSelectionContainer = connect(
    (state: State): Partial<CourseSelectionProps> => {
        return {
            preferSimultaneousCourseExecutionForParticipants: state.registration.applicant.preferSimultaneousCourseExecutionForParticipants,
            participants: state.registration.participants,
            possibleCourses: state.registration.possibleCourses
        }
    },
    {
        selectCoursesForParticipants,
        loadPossibleCourses
    }
)(CourseSelection)

export class RegistrationStep2Container extends React.Component {
    render() {
        return (<>
            <CourseSelectionContainer/>
        </>);
    }
}
