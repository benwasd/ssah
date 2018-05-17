import * as React from 'react';
import { Form } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../components/DateRangePicker';

export interface PartipiantListProps {
}

export interface PartipiantListState {
}

export class PartipiantList extends React.Component<PartipiantListProps, PartipiantListState> {
    render() {
        return (
            <div style={{margin: '1em 0em 0em'}}>
            </div>
        );
    }
}
