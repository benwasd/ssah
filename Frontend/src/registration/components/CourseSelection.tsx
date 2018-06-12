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
    applicantPhoneNumber: string;
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
        const participants = this.getValidParticipants();
        const possibleCoursesForParticipants = this.possibleCoursesForParticipants();
        const possibleCourseLength = this.props.possibleCourses.length;

        return (<>
            {(possibleCourseLength === 0) && <>
                <h2>
                    Momentan bieten wir für {this.getParticipantDisplayName()}<br /> kein passender Kurs an.
                </h2>
                <div>
                    Wir werden prüfen, ob wir für Sie einen Kurs durchführen können.
                    Wir werden Sie baldmöglichst per SMS auf der <span className='text-nowrap'>Nummer "{this.props.applicantPhoneNumber}"</span> informieren.
                </div></>}

            {possibleCourseLength > 0 && !participants.every(p => this.props.possibleCourses.some(pc => pc.registrationParticipantId === p.id)) &&<>
                <h2>
                    Momentan bieten wir nicht für alle Teilnehmer<br /> passende Kurse an.
                </h2>
                <div className="mb-3">
                    Wir werden prüfen, ob wir für {this.getParticipantWithNoPossibleCourseDisplayName()} einen Kurs durchführen können. 
                    Wir werden Sie baldmöglichst per SMS auf der <span className='text-nowrap'>Nummer "{this.props.applicantPhoneNumber}"</span> informieren.
                </div></>}

            {participants.length > 1 && possibleCourseLength > 0 &&
                <div style={{display: 'flex', lineHeight: '17px', marginBottom: '1rem'}}>
                    <Checkbox 
                        className='ml-3'
                        name='preferSimultaneousCourseExecutionForParticipants'
                        checked={this.state.preferSimultaneousCourseExecutionForParticipants}
                        onChange={(_, d) => this.setState({ preferSimultaneousCourseExecutionForParticipants: !!d.checked })} />
                    <div className='ml-3'>
                        Nur Durchführungen anzeigen, welche für {this.getParticipantDisplayName()} gleichzeitig stattfinden
                    </div>
                </div>}

            {possibleCoursesForParticipants.filter(p => p.possibleCourses.length > 0).map(p => 
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
                                        <NiveauVisualizer 
                                            discipline={p.participant.discipline}
                                            niveauId={p.participant.niveauId} />
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

    private getValidParticipants() {
        return this.props.participants
            .filter(hasAllForRegistrationParticipant)
            .filter(p => !!p.id);
    }

    private getParticipantDisplayName() {
        const validParticipantNames = this.getValidParticipants().map(p => p.name);
        const commaSeperatedGramaticalString = this.commaSeparatedGrammaticalSequence(validParticipantNames);

        return commaSeperatedGramaticalString;
    }

    private getParticipantWithNoPossibleCourseDisplayName() {
        const validParticipantWithNoPossibleCourseNames = this.getValidParticipants()
            .filter(p => this.props.possibleCourses.some(pc => pc.registrationParticipantId === p.id) === false)
            .map(p => p.name);
        const commaSeperatedGramaticalString = this.commaSeparatedGrammaticalSequence(validParticipantWithNoPossibleCourseNames);

        return commaSeperatedGramaticalString;
    }

    private commaSeparatedGrammaticalSequence(sequence: string[]) {
        if (sequence.length === 1) {
            return sequence[0];
        }
        else {
            return sequence.slice(0, sequence.length - 1).join(', ') 
                + ' und '
                + sequence[sequence.length - 1];
        }
    }
}
