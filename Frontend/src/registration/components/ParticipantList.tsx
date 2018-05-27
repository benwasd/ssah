import * as React from 'react';
import { omit } from 'lodash';

import { CourseType } from '../../api';
import { ParticipantState } from '../state';
import { Participant, ParticipantProps } from './Participant';

export interface ParticipantListProps {
    participants: ParticipantState[];
    changeParticipant(participantIndex: number, obj: Partial<ParticipantState>);
    showAllValidationErrors: boolean;
}

export interface ParticipantListState {
}

export class ParticipantList extends React.Component<ParticipantListProps, ParticipantListState> {
    render() {
        let participantsWithNewRow = this.props.participants.concat({ name: "", ageGroup: "" });

        // Add second new row if no or one participants entered
        if (this.props.participants.length <= 1) {
            participantsWithNewRow = participantsWithNewRow.concat({ name: "", ageGroup: "" });
        }

        return (
            <div style={{margin: '1em 0em 0em'}}>
                <table className="ui table unstackable participants">
                    <tbody>
                        {participantsWithNewRow.map((p, i) => {
                            const props = Object.assign(
                                omit(p, ['id', 'timestamp', 'committing']),
                                { 
                                    change: p => this.props.changeParticipant(i, p),
                                    showAllValidationErrors: this.props.showAllValidationErrors,
                                    isNewRow: i >= this.props.participants.length && i !== 0
                                }
                            ) as ParticipantProps;
                            
                            return (
                                <Participant key={p.id || i} {...props} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
