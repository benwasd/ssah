import * as moment from 'moment';
import * as React from 'react';
import { groupBy, map } from 'lodash';

import { Period } from '../../api';

export interface CourseDateVisualizerProps {
    periods: Period[];
}

export class CourseDateVisualizer extends React.Component<CourseDateVisualizerProps> {
    render() {
        if (this.props.periods.length === 0) {
            return null;
        }

        const firstPeriodElement = this.props.periods[0];
        const lastPeriodElement = this.props.periods[this.props.periods.length - 1];
        const start = firstPeriodElement.start;
        const oneWeekAfterStart = moment(firstPeriodElement.end).add(1, "w").toDate();

        const allPeriodElementsInSameWeek = this.props.periods.every(p => start <= p.start && p.end <= oneWeekAfterStart);
        const periodElementsOnSameDay = moment(firstPeriodElement.start).startOf('day').isSame(moment(lastPeriodElement.end).startOf('day'));

        if (allPeriodElementsInSameWeek && !periodElementsOnSameDay) {
            return this.renderWeekly(firstPeriodElement, lastPeriodElement);
        }
        else if (periodElementsOnSameDay) {
            return this.renderSingleDay(firstPeriodElement, this.props.periods);
        }
        else {
            return this.renderPeriods(firstPeriodElement);
        }
    }

    private renderWeekly(firstPeriodElement: Period, lastPeriodElement: Period) {
        const allPeriodElementsSameTimespan = this.props.periods
            .every(p => this.sameHoursAndMinutes(p.start, firstPeriodElement.start) && p.duration === firstPeriodElement.duration);

        const range = (
            <div>
                {moment(firstPeriodElement.start).format('LL')} - {moment(lastPeriodElement.end).format('LL')}
            </div>
        );

        if (allPeriodElementsSameTimespan) {
            return (<>
                {range}
                <div>
                    {this.props.periods.map(p => moment(p.start).format('dd')).join(', ') + ' '}
                    {moment(firstPeriodElement.start).format('HH:mm')} - {moment(firstPeriodElement.end).format('HH:mm')}
                </div>
            </>);
        }
        else {
            return (<>
                {range}
                {this.props.periods.map(p => {
                    var startMoment = moment(p.start);
                    var endMoment = moment(p.end);
                    return (
                        <div key={p.start.toString()}>
                            {startMoment.format('dd')}: {startMoment.format('HH:mm')} - {endMoment.format('HH:mm')}
                        </div>
                    );
                })}
            </>);
        }
    }

    private renderSingleDay(firstPeriodElement: Period, periods: Period[]) {
        const firstPeriodElementStartMoment = moment(firstPeriodElement.start);
        const firstPeriodElementEndMoment = moment(firstPeriodElement.end);
        const day = firstPeriodElementStartMoment.format('dd, LL');

        if (periods.length === 1) {
            return (
                <div>
                    {day} {firstPeriodElementStartMoment.format('HH:mm')} - {firstPeriodElementEndMoment.format('HH:mm')}
                </div>
            );
        }

        return (<>
            <div>{day}</div>
            {periods.map(p => {
                var startMoment = moment(p.start);
                var endMoment = moment(p.end);
                return (
                    <div key={p.start.toString()}>
                        {startMoment.format('HH:mm')} - {endMoment.format('HH:mm')}
                    </div>
                );
            })}
        </>);
    }

    private renderPeriods(firstPeriodElement: Period) {
        var periodsWithMomentStartDates = this.props.periods.map(p => { return { startDay: moment(p.start).startOf('day'), period: p } });
        var allPeriodsByDay = groupBy(periodsWithMomentStartDates, (v: { startDay: moment.Moment, period: Period }) => v.startDay);

        return map(allPeriodsByDay, (l, key) => {
            return (
                <div key={key}>
                    {this.renderSingleDay(l[0].period, l.map(x => x.period))}
                </div>
            );
        });
    }

    private sameHoursAndMinutes(a: Date, b: Date) {
        return a.getHours() === b.getHours()
            && a.getMinutes() === b.getMinutes();
    }
}
