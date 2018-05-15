import * as React from 'react';
import { Form } from 'semantic-ui-react';

import { ApplicantState } from '../state';
import { DateRangePicker} from '../../components/DateRangePicker';

export interface AvailabilitySelectorProps {
    availableFrom: Date;
    availableTo: Date;
    change(obj: Partial<ApplicantState>);
}

export class AvailabilitySelector extends React.Component<AvailabilitySelectorProps> {
    render() {
        return (
            <DateRangePicker />
        );
    }
}
