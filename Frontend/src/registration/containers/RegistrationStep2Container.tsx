import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../state';
import { applicantChange, selectCoursesForPartipiant, loadPossibleCourses } from '../actions';
import { ApplicantProps } from '../components/Applicant';
import { CourseSelection, CourseSelectionProps } from '../components/CourseSelection';

const CourseSelectionContainer = connect(
    (state: State): Partial<CourseSelectionProps> => {
        return {
            preferSimultaneousCourseExecutionForPartipiants: state.registration.applicant.preferSimultaneousCourseExecutionForPartipiants,
            partipiants: state.registration.partipiants,
            possibleCourses: state.registration.possibleCourses
        }
    },
    { 
        selectCoursesForPartipiant,
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
