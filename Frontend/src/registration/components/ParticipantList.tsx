import * as React from 'react';
import { Form } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState, ParticipantState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../components/DateRangePicker';
import { Participant, ParticipantProps } from './Participant';
import { omit } from 'lodash';

export interface ParticipantListProps {
    participants: ParticipantState[];
    changeParticipant(participantIndex: number, obj: Partial<ParticipantState>);
}

export interface ParticipantListState {
}

export class ParticipantList extends React.Component<ParticipantListProps, ParticipantListState> {
    render() {
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
                        {this.props.participants.map((p, i) => {
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
