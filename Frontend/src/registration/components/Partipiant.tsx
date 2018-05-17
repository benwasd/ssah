import * as React from 'react';
import { Form } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../components/DateRangePicker';

export interface PartipiantProps {
}

export interface PartipiantState {
}

export class Partipiant extends React.Component<PartipiantProps, PartipiantState> {
    render() {
        return (
            <tr>
                <td>set rating</td>
                <td>rating (integer)</td>
                <td>Sets the current star rating to specified value</td>
            </tr>
        );
    }
}
