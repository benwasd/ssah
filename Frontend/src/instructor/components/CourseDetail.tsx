import * as React from 'react';
import * as moment from 'moment';
import { sortBy } from 'lodash';

import { CourseDto, Discipline, CourseType, CourseParticipantDto } from '../../api';
import { Link, match } from 'react-router-dom';

export interface CourseDetailProps {
    match: match<{ id: string }>;
    course: CourseDto;
}

export class CourseDetail extends React.Component<CourseDetailProps> {
    render() {
        return (<>
            <h1>Kurs {this.props.course.actualCourseStart.toString()}</h1>
            <div className="ui relaxed divided list">
                {this.orderdParticipants().map(this.renderParticipant)}
            </div>
        </>);
    }

    private orderdParticipants = () => {
        const currentTime = new Date().getTime();
        return sortBy(this.props.course.participants, (c: CourseParticipantDto) => c.name);
    }

    private renderParticipant = (participant: CourseParticipantDto) => {
        return (
            <div className="item" key={participant.id}>
                {participant.name}
            </div>
        );
    }
}
