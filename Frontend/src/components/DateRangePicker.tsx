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
    static propTypes = {
        // example props for the demo
        autoFocus: PropTypes.bool,
        autoFocusEndDate: PropTypes.bool,
        stateDateWrapper: PropTypes.func,
        initialStartDate: momentPropTypes.momentObj,
        initialEndDate: momentPropTypes.momentObj,
        
        ...omit(DateRangePickerShape, [
            'startDate',
            'endDate',
            'onDatesChange',
            'focusedInput',
            'onFocusChange',
        ]),
	};

    static defaultProps = {
        autoFocus: false,
        autoFocusEndDate: false,
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
        phrases: DateRangePickerPhrases,
      
        stateDateWrapper: date => date,
    };

    constructor(props) {
        super(props);

        let focusedInput: string | null = null;
        if (props.autoFocus) {
            focusedInput = "startDate";
        }
        else if (props.autoFocusEndDate) {
            focusedInput = "endDate";
        }

        this.state = {
            focusedInput,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };
    }

    onDatesChange = ({ startDate, endDate }) => {
        const { stateDateWrapper } = this.props as any;

        this.setState({
            startDate: startDate && stateDateWrapper(startDate),
            endDate: endDate && stateDateWrapper(endDate),
        });

        this.props.onDatesChange({startDate, endDate});
    }

    onFocusChange = (focusedInput) => {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state as any;

        // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
        // example wrapper but are not props on the SingleDatePicker itself and
        // thus, have to be omitted.
        const props = omit(this.props, [
            'autoFocus',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
            'stateDateWrapper',
        ]);

        return (
            <div>
                <ReactDatesDateRangePicker
                    {...props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}/>
            </div>
        );
    }
}
