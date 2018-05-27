import * as React from 'react';
import { groupBy, map, chain } from 'lodash';
import { Radio, Checkbox, Form, FormField } from 'semantic-ui-react';

import { PossibleCourseDto } from '../../api';
import { CourseDateVisualizer } from '../../main/components/CourseDateVisualizer';
import { throwIfUndefined } from '../../utils';
import { hasAllForRegistrationParticipant, ParticipantState } from '../state';
import { NiveauVisualizer } from '../../main/components/NiveauVisualizer';
import './CourseSelection.less';

export interface SelectionMap { 
    [participantId: string]: {
        identifier: number; 
        startDate: Date; 
    }
}

export interface CourseSelectionProps {
    participants: ParticipantState[];
    possibleCourses: PossibleCourseDto[];
    selectCoursesForParticipants(selectedCoursesByParticipant: SelectionMap);
    showAllValidationErrors: boolean;
}

export interface CourseSelectionState {
    selectedCourses: SelectionMap;
    preferSimultaneousCourseExecutionForParticipants: boolean;
}

interface PossibleCoursesByParticipant {
    participantId: string;
    participant: ParticipantState;
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
        this.setSelectedCourseStateByParticipants();
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

    possibleCoursesForParticipants = (): PossibleCoursesByParticipant[] => {
        const validParticipants = this.getValidParticipants();
        if (this.state.preferSimultaneousCourseExecutionForParticipants) {
            const groups = chain(this.props.possibleCourses)
                .groupBy(pc => pc.startDate.toString() + "_" + pc.identifier)
                .map((value, key) => value)
                .value();

            return validParticipants
                .map(vp => {
                    return {
                        participantId: throwIfUndefined(vp.id),
                        participant: vp,
                        possibleCourses: groups
                            .filter(g => validParticipants.every(p => g.some(ge => ge.registrationParticipantId === p.id)))
                            .map(g => g.filter(ge => ge.registrationParticipantId === vp.id)[0])
                    };
                });
        }
        else {
            return validParticipants
                .map(vp => {
                    return {
                        participantId: throwIfUndefined(vp.id),
                        participant: vp,
                        possibleCourses: this.props.possibleCourses.filter(pc => pc.registrationParticipantId === vp.id)
                    };
                });
        }
    }

    render() {
        return (<>
            {this.getValidParticipants().length > 1 && this.props.possibleCourses.length > 0 &&
                <div style={{display: 'flex', lineHeight: '17px', marginBottom: '1rem'}}>
                    <Checkbox 
                        className='ml-3'
                        name='preferSimultaneousCourseExecutionForParticipants'
                        checked={this.state.preferSimultaneousCourseExecutionForParticipants}
                        onChange={(_, d) => this.setState({ preferSimultaneousCourseExecutionForParticipants: !!d.checked })} />
                    <div className='ml-3'>
                        Nur Durchführungen anzeigen, welche für {this.getValidParticipantDisplayName()} gleichzeitig stattfinden
                    </div>
                </div>}

            {this.possibleCoursesForParticipants()
                .map(p => 
                    <div key={p.participantId}>
                        <h2 className='mt-4'>{p.participant.name}</h2>
                        <table className='ui very basic unstackable collapsing celled table courseselection'>
                            <tbody>
                                {p.possibleCourses.map((c, i) =>
                                    <tr key={c.identifier + "" + c.startDate}>
                                        <td>
                                            <Radio
                                                className='ml-3'
                                                onClick={() => this.toggleSelection(p.participantId, c.identifier, c.startDate)} 
                                                checked={this.isCombinationChecked(p.participantId, c.identifier, c.startDate)} />
                                        </td>
                                        <td className='niveau'>
                                            <NiveauVisualizer discipline={p.participant.discipline} niveauId={p.participant.niveauId} />
                                        </td>
                                        <td className='periods'>
                                            <CourseDateVisualizer periods={c.coursePeriods} />
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            {this.props.showAllValidationErrors && 
                <div className='ui negative message m-0 mt-3'>
                    <p>Bitte wählen Sie für jeden Teilnehmer die passende Durchführung aus.</p>
                </div>}
        </>);
    }

    private getValidParticipants() {
        return this.props.participants
            .filter(hasAllForRegistrationParticipant)
            .filter(p => !!p.id);
    }

    private getValidParticipantDisplayName() {
        const validParticipantNames = this.getValidParticipants().map(p => p.name);
        if (validParticipantNames.length === 1) {
            return validParticipantNames[0];
        }
        else {
            return validParticipantNames.slice(0, validParticipantNames.length - 1).join(', ') 
                + ' und '
                + validParticipantNames[validParticipantNames.length - 1];
        }
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
}
