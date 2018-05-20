import * as React from 'react';

import { PossibleCourseDto } from '../../api';
import { PartipiantState, hasAllRegistrationProperties } from '../state';
import { CourseDateVisualizer } from './CourseDatesVisualizer';

export interface CourseSelectionProps {
    preferSimultaneousCourseExecutionForPartipiants: boolean;
    partipiants: PartipiantState[];
    possibleCourses: PossibleCourseDto[];
    loadPossibleCourses();
    selectCoursesForPartipiant(partipiantId: string, selectedCourses: { identifier: number; startDate: Date; }[]);
}

export class CourseSelection extends React.Component<CourseSelectionProps> {
    componentDidMount() {
        this.props.loadPossibleCourses();
    }

    render() {
        return (
            this.props.partipiants
                .filter(hasAllRegistrationProperties)
                .map(p => 
                    <div key={p.id}>
                        <h1>{p.name} {p.id}</h1>
                        {this.props.possibleCourses
                            .filter(c => c.registrationPartipiantId === p.id)
                            .map(c =>
                                <div key={c.identifier + "" + c.startDate}>
                                    <CourseDateVisualizer periods={c.coursePeriods} />
                                    <div className="ui divider"></div>
                                </div>
                            )}
                    </div>
                )
        );
    }
}
