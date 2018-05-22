import * as React from 'react';
import { Form } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState, PartipiantState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../components/DateRangePicker';
import { Partipiant, PartipiantProps } from './Partipiant';
import { omit } from 'lodash';

export interface PartipiantListProps {
    partipiants: PartipiantState[];
    changePartipiant(partipiantIndex: number, obj: Partial<PartipiantState>);
}

export interface PartipiantListState {
}

export class PartipiantList extends React.Component<PartipiantListProps, PartipiantListState> {
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
                        {this.props.partipiants.map((p, i) => {
                            const props = Object.assign(
                                omit(p, ['id', 'timestamp', 'committing']),
                                { change: p => this.props.changePartipiant(i, p) }
                            ) as PartipiantProps;
                            
                            return (
                                <Partipiant key={p.id || i} {...props} />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
