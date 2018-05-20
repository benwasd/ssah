import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../state';
import { applicantChange, selectCoursesForParticipants, loadPossibleCourses } from '../actions';
import { ApplicantProps } from '../components/Applicant';
import { CourseSelection, CourseSelectionProps } from '../components/CourseSelection';

const CourseSelectionContainer = connect(
    (state: State): Partial<CourseSelectionProps> => {
        return {
            preferSimultaneousCourseExecutionForPartipiants: state.registration.applicant.preferSimultaneousCourseExecutionForPartipiants,
            partipiants: state.registration.partipiants,
            possibleCourses: state.registration.possibleCourses,
            initalSelectedCourses: state.registration.partipiants.filter(p => p.commiting).map(p => { 
                return {
                    participantId: p.id as string,
                    identifier: (p.commiting as any).courseIdentifier,
                    startDate: (p.commiting as any).courseStartDate
                }
            })
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
