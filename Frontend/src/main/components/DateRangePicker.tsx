import * as moment from 'moment';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as momentPropTypes from 'react-moment-proptypes';
import { omit } from 'lodash';
import { DateRangePicker as ReactDatesDateRangePicker, DateRangePickerShape, isInclusivelyAfterDay } from 'react-dates';

import DateRangePickerPhrases from './DateRangePickerPhrases';

import './DateRangePicker.less';
import 'react-dates/initialize';

export interface DateRangePickerPropsDateChange {
    startDate: moment.Moment;
    endDate: moment.Moment;
}

export interface DateRangePickerProps {
    initialStartDate?: moment.Moment;
    initialEndDate?: moment.Moment;
    onDatesChange: (dateChange: DateRangePickerPropsDateChange) => void;
}

export class DateRangePicker extends React.Component<DateRangePickerProps> {

    static defaultProps = {
        initialStartDate: null,
        initialEndDate: null,
      
        // input related props
        startDateId: "startDate",
        startDatePlaceholderText: 'Von Datum',
        endDateId: "endDate",
        endDatePlaceholderText: 'Bis Datum',
        disabled: false,
        required: false,
        screenReaderInputMessage: '',
        showClearDates: false,
        showDefaultInputIcon: false,
        customInputIcon: null,
        customArrowIcon: null,
        customCloseIcon: null,
        block: false,
        small: false,
        regular: false,
      
        // calendar presentation and interaction related props
        renderMonth: null,
        orientation: "horizontal",
        anchorDirection: "left",
        horizontalMargin: 0,
        withPortal: false,
        withFullScreenPortal: false,
        initialVisibleMonth: null,
        numberOfMonths: 2,
        keepOpenOnDateSelect: false,
        reopenPickerOnClearDates: false,
        isRTL: false,
      
        // navigation related props
        navPrev: null,
        navNext: null,
        onPrevMonthClick() {},
        onNextMonthClick() {},
        onClose() {},
      
        // day presentation and interaction related props
        renderCalendarDay: undefined,
        renderDayContents: null,
        minimumNights: 1,
        enableOutsideDays: false,
        isDayBlocked: () => false,
        isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
        isDayHighlighted: () => false,
      
        // internationalization
        displayFormat: () => moment.localeData().longDateFormat('L'),
        monthFormat: 'MMMM YYYY',
        phrases: DateRangePickerPhrases
    };

    constructor(props) {
        super(props);

        this.state = {
            focusedInput: null,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };
    }

    onDatesChange = ({ startDate, endDate }) => {
        this.setState({ startDate: startDate, endDate: endDate });
        this.props.onDatesChange({ startDate, endDate });
    }

    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state as any;

        const props = omit(this.props, [
            'initialStartDate',
            'initialEndDate'
        ]);

        return (
            <ReactDatesDateRangePicker
                {...props}
                onDatesChange={this.onDatesChange}
                onFocusChange={this.onFocusChange}
                focusedInput={focusedInput}
                startDate={startDate}
                endDate={endDate}
                orientation={window.innerWidth < 768 ? "vertical" : "horizontal"}/>
        );
    }
}
