import * as React from 'react';
import * as moment from 'moment';

import { throwIfUndefined } from '../../utils';
import { ApplicantState, AvailabilityState, ParticipantState, hasAllForRegistrationParticipant } from '../state';
import { languages } from '../../resources';
import { CourseDateVisualizer } from '../../main/components/CourseDateVisualizer';
import { Period, PossibleCourseDto } from '../../api';

export interface SummaryProps {
    applicant: ApplicantState;
    participants: ParticipantState[];
    possibleCourses: PossibleCourseDto[];
}

export class Summary extends React.Component<SummaryProps> {
    render() {
        return (
            <table className="ui very basic collapsing unstackable celled table">
                <tbody>
                    <tr>
                        <td><strong>Mobile</strong></td>
                        <td>{this.props.applicant.phoneNumber}</td>
                    </tr>
                    <tr>
                        <td><strong>Vorname</strong></td>
                        <td>{this.props.applicant.givenname}</td>
                    </tr>
                    <tr>
                        <td><strong>Nachname</strong></td>
                        <td>{this.props.applicant.surname}</td>
                    </tr>
                    <tr>
                        <td><strong>Ort / Hotel</strong></td>
                        <td>{this.props.applicant.residence}</td>
                    </tr>
                    <tr>
                        <td><strong>Sprache</strong></td>
                        <td>{languages[throwIfUndefined(this.props.applicant.language)]}</td>
                    </tr>
                    {this.props.participants.filter(hasAllForRegistrationParticipant).map(p => {
                        let coursePeriods: Period[] | undefined;

                        // state of the commitment (if in past)
                        const committing = p.committing;
                        if (p.committedCoursePeriods) {
                            coursePeriods = p.committedCoursePeriods;
                        }

                        // current committing (if currently active)
                        if (committing) {
                            const course = throwIfUndefined(
                                this.props.possibleCourses.find(pc => pc.startDate == committing.courseStartDate && pc.identifier === committing.courseIdentifier)
                            );
                            coursePeriods = course.coursePeriods;
                        }

                        return (
                            <tr key={p.id}>
                                <td><strong>Kurs für <br />{p.name}</strong></td>
                                <td>
                                    {coursePeriods && <CourseDateVisualizer periods={coursePeriods} />}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        )
    }
}
