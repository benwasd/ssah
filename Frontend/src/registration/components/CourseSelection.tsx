import * as React from 'react';

import { PossibleCourseDto } from '../../api';
import { PartipiantState, hasAllRegistrationProperties } from '../state';
import { CourseDateVisualizer } from './CourseDatesVisualizer';
import { Checkbox, Button } from 'semantic-ui-react';

interface SelectionKey { 
    participantId: string;
    identifier: number;
    startDate: Date; 
}

export interface CourseSelectionProps {
    preferSimultaneousCourseExecutionForPartipiants: boolean;
    partipiants: PartipiantState[];
    possibleCourses: PossibleCourseDto[];
    loadPossibleCourses();
    initalSelectedCourses: SelectionKey[];
    selectCoursesForParticipants(selectedCourses: SelectionKey[]);
}

export interface CourseSelectionState {
    selectedCourses: SelectionKey[]
}

export class CourseSelection extends React.Component<CourseSelectionProps, CourseSelectionState> {
    componentDidMount() {
        this.props.loadPossibleCourses();
    }

    componentWillReceiveProps() {
        this.setState({ selectedCourses: this.props.initalSelectedCourses });
    }
    
    toggleSelection = (participantId: string, identifier: number, startDate: Date) => {
        let current = this.state.selectedCourses.concat();
        const index = this.indexOf(participantId, identifier, startDate, current);
        if (index >= 0) {
            current.splice(index, 1);
        }
        else {
            current = current.concat({ participantId, identifier, startDate });
        }

        console.log("PRE", this.state);
        this.setState({ selectedCourses: current }, () => { console.log("POST", this.state); });
    }

    send = () => {
        this.props.selectCoursesForParticipants(this.state.selectedCourses);
    }

    indexOf(participantId: string, identifier: number, startDate: Date, seq: SelectionKey[]): number {
        return seq.findIndex(
            sc => sc.participantId === participantId 
               && sc.identifier === identifier 
               && sc.startDate.getTime() === startDate.getTime()
        );
    }

    render() {
        return (<>
            {this.props.partipiants
                .filter(hasAllRegistrationProperties)
                .map(p => 
                    <div key={p.id}>
                        <h1>{p.name} {p.id}</h1>
                        {this.props.possibleCourses
                            .filter(c => c.registrationPartipiantId === p.id)
                            .map(c =>
                                <div key={c.identifier + "" + c.startDate}>
                                    <CourseDateVisualizer periods={c.coursePeriods} />
                                    <Checkbox 
                                        onClick={() => this.toggleSelection(p.id as any, c.identifier, c.startDate)} 
                                        defaultChecked={this.indexOf(p.id as any, c.identifier, c.startDate, this.props.initalSelectedCourses) >= 0} />
                                    <div className="ui divider"></div>
                                </div>
                            )}
                    </div>
                )}
            <Button onClick={this.send}>Send</Button>
        </>);
    }
}
