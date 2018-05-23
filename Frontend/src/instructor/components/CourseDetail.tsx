import * as React from 'react';
import * as moment from 'moment';
import { sortBy } from 'lodash';

import { CourseDto, Discipline, CourseType, CourseParticipantDto, CourseParticipantFeedbackDto } from '../../api';
import { match } from 'react-router-dom';
import { Checkbox, CheckboxProps, Button } from 'semantic-ui-react';

export interface CourseDetailProps {
    match: match<{ id: string }>;
    course: CourseDto;
    closeCourse(courseId: string, courseRowVersion: string, participantsFeedback: CourseParticipantFeedbackDto[]);
}

export interface CourseDetailState {
    mode: DetailMode;
}

export enum DetailMode {
    View,
    CloseCourse
}

export class CourseDetail extends React.Component<CourseDetailProps, CourseDetailState> {
    constructor(props: CourseDetailProps) {
        super(props);
        this.state = { mode: DetailMode.View };
    }

    passedCheckBoxes: React.Component<CheckboxProps, React.ComponentState, any>[] = [];

    onClose = () => {
        const passed = this.passedCheckBoxes.filter(cb => (cb.state as any).checked).map(cb => cb.props.name);
        const participantsFeedback = this.props.course.participants.map(p => {
            const res = new CourseParticipantFeedbackDto();
            res.id = p.id;
            res.rowVersion = p.rowVersion;
            res.passed = passed.indexOf(res.id) >= 0;
            return res;
        });
        
        this.props.closeCourse(this.props.course.id, this.props.course.rowVersion, participantsFeedback);
    }

    render() {
        return (<>
            <h1>Kurs {this.props.course.actualCourseStart.toString()}</h1>
            <div className="ui relaxed divided list">
                {this.orderdParticipants().map(this.renderParticipant)}
            </div>
            {this.state.mode == DetailMode.View &&
                <Button onClick={() => this.setState({ mode: DetailMode.CloseCourse })}>Close</Button>
            }
            {this.state.mode == DetailMode.CloseCourse &&
                <Button onClick={this.onClose}>Send Close</Button>
            }
        </>);
    }

    private orderdParticipants = () => {
        const currentTime = new Date().getTime();
        return sortBy(this.props.course.participants, (c: CourseParticipantDto) => c.name);
    }

    private renderParticipant = (participant: CourseParticipantDto) => {
        return (
            <div className="item" key={participant.id}>
                {this.state.mode == DetailMode.CloseCourse &&
                    <Checkbox ref={e => e && this.passedCheckBoxes.push(e)} name={participant.id} />
                }
                {participant.name}
            </div>
        );
    }
}
