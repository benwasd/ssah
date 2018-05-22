import * as React from 'react';
import { Radio } from 'semantic-ui-react';

import { PossibleCourseDto } from '../../api';
import { throwIfUndefined } from '../../utils';
import { hasAllRegistrationProperties, PartipiantState } from '../state';
import { CourseDateVisualizer } from './CourseDatesVisualizer';

export interface SelectionMap { 
    [participantId: string]: {
        identifier: number; 
        startDate: Date; 
    }
}

export interface CourseSelectionProps {
    preferSimultaneousCourseExecutionForPartipiants: boolean;
    partipiants: PartipiantState[];
    possibleCourses: PossibleCourseDto[];
    loadPossibleCourses();
    selectCoursesForParticipants(selectedCoursesByParticipant: SelectionMap);
}

export interface CourseSelectionState {
    selectedCourses: SelectionMap
}

export class CourseSelection extends React.Component<CourseSelectionProps, CourseSelectionState> {
    componentWillMount() {
        this.props.loadPossibleCourses();
        this.setStateByParticipants();
    }
    
    toggleSelection = (participantId: string, identifier: number, startDate: Date) => {
        let newSelection = Object.assign({}, this.state.selectedCourses);
        newSelection[participantId] = { identifier, startDate};

        this.setState({ selectedCourses: newSelection });
        this.props.selectCoursesForParticipants(newSelection);
    }

    isCombinationChecked = (participantId: string, identifier: number, startDate: Date) => {
        const participant = this.state.selectedCourses[participantId];
        return participant 
            && participant.identifier === identifier
            && participant.startDate.getTime() === startDate.getTime();
    }

    render() {
        return (<>
            {this.props.partipiants
                .filter(hasAllRegistrationProperties)
                .map(p => 
                    <div key={p.id}>
                        <h1>{p.name} {p.id}</h1>
                        {this.props.possibleCourses
                            .filter(c => c.registrationParticipantId === p.id)
                            .map(c =>
                                <div key={c.identifier + "" + c.startDate}>
                                    <CourseDateVisualizer periods={c.coursePeriods} />
                                    <Radio
                                        onClick={() => this.toggleSelection(p.id as string, c.identifier, c.startDate)} 
                                        checked={this.isCombinationChecked(p.id as string, c.identifier, c.startDate)} />
                                    <div className="ui divider"></div>
                                </div>
                            )}
                    </div>
                )}
        </>);
    }

    private setStateByParticipants() {
        const map: SelectionMap = {};

        this.props.partipiants.filter(p => p.committing).forEach(p => {
            map[p.id as string] = {
                identifier: throwIfUndefined(p.committing).courseIdentifier,
                startDate: throwIfUndefined(p.committing).courseStartDate
            };
        });

        this.setState({ selectedCourses: map });
    }
}
