import * as React from 'react';
import { omit } from 'lodash';

import { ParticipantState } from '../state';
import { Participant, ParticipantProps } from './Participant';

export interface ParticipantListProps {
    participants: ParticipantState[];
    changeParticipant(participantIndex: number, obj: Partial<ParticipantState>);
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
                <table className="ui definition table">
                    <thead>
                        <tr>
                            <th className="four wide"></th>
                            <th className="four wide">Kurstyp</th>
                            <th className="four wide">Disziplin</th>
                            <th className="four wide">Niveau</th>
                            <th className="four wide">Jahrgang</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participantsWithNewRow.map((p, i) => {
                            const props = Object.assign(
                                omit(p, ['id', 'timestamp', 'committing']),
                                { change: p => this.props.changeParticipant(i, p) }
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
