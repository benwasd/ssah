import * as React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

import { ApplicantState, PartipiantState } from '../state';
import { toDropdownValue, getEnumElementsAsDropdownItemProps, fromDropdownValue } from '../../utils';
import { Language, PossibleCourseDto } from '../../api';

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
            this.props.partipiants.map(p => 
                <div key={p.id}>
                    {p.name} {p.id}
                    {this.props.possibleCourses
                        .filter(c => c.registrationPartipiantId === p.id)
                        .map(c => <div key={c.identifier}>{c.startDate} X {c.identifier}</div>)}
                </div>
            )
        );
    }
}
