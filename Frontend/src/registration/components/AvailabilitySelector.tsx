import * as React from 'react';
import * as moment from 'moment';
import { Form } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../main/components/DateRangePicker';
import './AvailabilitySelector.less';

export interface AvailabilitySelectorProps {
    availableFrom: Date;
    availableTo: Date;
    change(obj: AvailabilityState);
}

export class AvailabilitySelector extends React.Component<AvailabilitySelectorProps> {
    onDatesChange = (dateChange: DateRangePickerPropsDateChange) => {
        this.props.change({ 
            availableFrom: dateChange.startDate ? dateChange.startDate.toDate() : undefined,
            availableTo: dateChange.endDate ? dateChange.endDate.toDate() : undefined
        });
    }

    render() {
        return (
            <div className='availability'>
                <div className='ui form'>
                    <Form.Field required>
                        <label>Verfügbarkeit</label>
                    </Form.Field>
                </div>
                <DateRangePicker 
                    initialStartDate={this.props.availableFrom ? moment(this.props.availableFrom) : undefined} 
                    initialEndDate={this.props.availableTo ? moment(this.props.availableTo) : undefined}
                    onDatesChange={this.onDatesChange} />
            </div>
        );
    }
}
