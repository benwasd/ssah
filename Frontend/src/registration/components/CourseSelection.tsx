import * as React from 'react';
import { groupBy, map, chain } from 'lodash';
import { Radio, Checkbox } from 'semantic-ui-react';

import { PossibleCourseDto } from '../../api';
import { CourseDateVisualizer } from '../../main/components/CourseDateVisualizer';
import { throwIfUndefined } from '../../utils';
import { hasAllForRegistrationParticipant, ParticipantState } from '../state';

export interface SelectionMap { 
    [participantId: string]: {
        identifier: number; 
        startDate: Date; 
    }
}

export interface CourseSelectionProps {
    participants: ParticipantState[];
    possibleCourses: PossibleCourseDto[];
    loadPossibleCourses();
    selectCoursesForParticipants(selectedCoursesByParticipant: SelectionMap);
}

export interface CourseSelectionState {
    selectedCourses: SelectionMap;
    preferSimultaneousCourseExecutionForParticipants: boolean;
}

interface Xyz {
    participantIds: string[];
    participants: ParticipantState[];
    possibleCourses: PossibleCourseDto[];
}

export class CourseSelection extends React.Component<CourseSelectionProps, CourseSelectionState> {
    constructor(props: CourseSelectionProps) {
        super(props);

        this.state = {
            selectedCourses: {},
            preferSimultaneousCourseExecutionForParticipants: true
        }
    }

    componentWillMount() {
        this.props.loadPossibleCourses();
        this.setSelectedCourseStateByParticipants();
    }
    
    toggleSelection = (participantIds: string[], identifier: number, startDate: Date) => {
        let newSelection = Object.assign({}, this.state.selectedCourses);

        participantIds.forEach(id => {
            newSelection[id] = { identifier, startDate};
        });

        this.setState({ selectedCourses: newSelection });
        this.props.selectCoursesForParticipants(newSelection);
    }

    isCombinationChecked = (participantIds: string[], identifier: number, startDate: Date) => {
        const participant = this.state.selectedCourses[participantIds[0]];
        return participant 
            && participant.identifier === identifier
            && participant.startDate.getTime() === startDate.getTime();
    }

    getXyz = (): Xyz[] => {
        const validParticipants = this.props.participants
            .filter(hasAllForRegistrationParticipant)
            .filter(p => !!p.id);

        if (this.state.preferSimultaneousCourseExecutionForParticipants) {
            const groups = chain(this.props.possibleCourses)
                .groupBy(pc => pc.startDate.toString() + "_" + pc.identifier)
                .map((value, key) => value)
                .value();

            return [{
                participantIds: validParticipants.map(p => throwIfUndefined(p.id)),
                participants: validParticipants,
                possibleCourses: groups
                    .filter(g => validParticipants.every(p => g.some(ge => ge.registrationParticipantId === p.id)))
                    .map(g => g[0])
            }];
        }
        else {
            return validParticipants
                .map(p => {
                    return {
                        participantIds: [throwIfUndefined(p.id)],
                        participants: [p],
                        possibleCourses: this.props.possibleCourses.filter(pc => pc.registrationParticipantId === p.id)
                    };
                });
        }
    }

    render() {
        return (<>
            <div>
                <label>Nur gleichzeitige Kurse</label>
                <Checkbox 
                    name='preferSimultaneousCourseExecutionForParticipants'
                    checked={this.state.preferSimultaneousCourseExecutionForParticipants}
                    onChange={(_, d) => this.setPreferSimultaneousCourseExecutionState(!!d.checked)} />
            </div>
            {this.getXyz()
                .map(p => 
                    <div key={p.participantIds.join('-')}>
                        <h1>{p.participants.map(p => p.name).join('-')}</h1>
                        {p.possibleCourses.map(c =>
                            <div key={c.identifier + "" + c.startDate}>
                                <CourseDateVisualizer periods={c.coursePeriods} />
                                <Radio
                                    onClick={() => this.toggleSelection(p.participantIds, c.identifier, c.startDate)} 
                                    checked={this.isCombinationChecked(p.participantIds, c.identifier, c.startDate)} />
                                <div className="ui divider"></div>
                            </div>
                        )}
                    </div>
                )}
        </>);
    }

    private setSelectedCourseStateByParticipants() {
        const map: SelectionMap = {};

        this.props.participants.filter(p => p.committing).forEach(p => {
            map[p.id as string] = {
                identifier: throwIfUndefined(p.committing).courseIdentifier,
                startDate: throwIfUndefined(p.committing).courseStartDate
            };
        });

        this.setState({ selectedCourses: map });
    }

    private setPreferSimultaneousCourseExecutionState(checked: boolean) {
        if (this.state.preferSimultaneousCourseExecutionForParticipants === false && checked === true) {
            this.setState({ selectedCourses: {}, preferSimultaneousCourseExecutionForParticipants: true });
            this.props.selectCoursesForParticipants({});
        }
        else {
            this.setState({ preferSimultaneousCourseExecutionForParticipants: false });
        }
    }
}
