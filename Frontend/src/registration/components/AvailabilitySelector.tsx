import * as React from 'react';
import * as moment from 'moment';
import { Form } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../components/DateRangePicker';

export interface AvailabilitySelectorProps {
    availableFrom: Date;
    availableTo: Date;
    change(obj: AvailabilityState);
}

export class AvailabilitySelector extends React.Component<AvailabilitySelectorProps> {
    onDatesChange = (dateChange: DateRangePickerPropsDateChange) => {
        this.props.change({ 
            availableFrom: dateChange.startDate == null ? null : dateChange.startDate.toDate(),
            availableTo: dateChange.endDate == null ? null : dateChange.endDate.toDate()
        });
    }

    render() {
        return (<>
            <Form style={{margin: '1em 0em 0em'}}>
                <Form.Field required>
                    <label>Verfügbarkeit</label>
                </Form.Field>
            </Form>
            <DateRangePicker 
                initialStartDate={this.props.availableFrom == null ? null : moment(this.props.availableFrom)} 
                initialEndDate={this.props.availableTo == null ? null : moment(this.props.availableTo)}
                onDatesChange={this.onDatesChange} />
        </>);
    }
}
