import * as React from 'react';
import * as moment from 'moment';
import { sortBy } from 'lodash';
import { match, RouteComponentProps, Link } from 'react-router-dom';
import { Button, Checkbox, CheckboxProps, Modal, Icon, Header } from 'semantic-ui-react';

import { CourseDto, CourseParticipantDto, CourseParticipantFeedbackDto, CourseStatus } from '../../api';
import { throwIfUndefined } from '../../utils';
import { CourseDateVisualizer } from '../../main/components/CourseDateVisualizer';
import { courseTypes, languages } from '../../resources';

export interface CourseDetailProps extends RouteComponentProps<{ id: string }> {
    course?: CourseDto;
    loadCourse(courseId: string);
    closeCourse(courseId: string, courseRowVersion: string, participantsFeedback: CourseParticipantFeedbackDto[]);
}

export interface CourseDetailState {
    mode: DetailMode;
    closeCourseConfirmOpen: boolean;
    passedParticipants: string[];
}

export enum DetailMode {
    View,
    CloseCourse,
    ClosedCourse
}

export class CourseDetail extends React.Component<CourseDetailProps, CourseDetailState> {
    private unsubscribeHistoryListen: () => void;

    constructor(props: CourseDetailProps) {
        super(props);
        this.state = { mode: DetailMode.View, closeCourseConfirmOpen: false, passedParticipants: [] };
    }

    componentWillMount() {
        this.handleNavigate(this.props.location.pathname);
        this.unsubscribeHistoryListen = this.props.history
            .listen((location, action) => this.handleNavigate(location.pathname));
    }
    
    componentWillUnmount() {
        this.unsubscribeHistoryListen();
    }

    handleNavigate(pathname: string) {
        if (!this.props.course || this.props.course.id.toUpperCase() !== this.props.match.params.id.toUpperCase()) {
            this.props.loadCourse(this.props.match.params.id);
        }
    }

    handlePassedCheckboxChange = (participantId, p: CheckboxProps) => {
        const newState = p.checked 
            ? this.state.passedParticipants.concat([participantId]) 
            : this.state.passedParticipants.filter(p => p !== participantId);
        this.setState({ passedParticipants: newState });
    }

    onClose = () => {
        const course = throwIfUndefined(this.props.course);
        const passed = this.state.passedParticipants;
        const participantsFeedback = course.participants.map(p => {
            const res = new CourseParticipantFeedbackDto();
            res.id = p.id;
            res.rowVersion = p.rowVersion;
            res.passed = passed.indexOf(res.id) >= 0;
            return res;
        });
        
        this.props.closeCourse(course.id, course.rowVersion, participantsFeedback);
        this.setState({ mode: DetailMode.ClosedCourse, closeCourseConfirmOpen: false, passedParticipants: [] });
    }
    
    render() {
        if (this.props.course) {
            return (<>
                <h2 className='mb-0'>{courseTypes[this.props.course.courseType]} mit {this.props.course.participants.length} Teilnehmer</h2>
                <div className='lead mb-3'>
                    {this.props.course.actualCourseStart.getTime() < new Date().getTime() ? 'Begann ' : 'Beginnt '}
                    {moment(this.props.course.actualCourseStart).fromNow()} ({moment(this.props.course.actualCourseStart).format('LLLL')})
                </div>
                
                <h4 className='mb-1'>Durchführung</h4>
                <CourseDateVisualizer periods={this.props.course && this.props.course.coursePeriods || []} />
                
                <h4 className='mb-1'>Teilnehmer</h4>
                <table className="ui very basic collapsing celled table">
                    <thead>
                        <tr>
                            {this.state.mode == DetailMode.CloseCourse &&
                                <th className='text-center'>Kurs bestanden</th>}
                            <th>Name</th>
                            <th>Jahrgang</th>
                            <th>Sprache</th>
                            <th>Wohnort</th>
                            <th>Tel. Anmeldende Person</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.orderdParticipants().map(this.renderParticipant)}
                    </tbody>
                </table>

                <div className='mt-4'>
                    <Link className="ui button" to='/'>Zurück</Link>
                    {this.state.mode == DetailMode.View && this.props.course.courseStatus === CourseStatus.Committed &&
                        <Button onClick={() => this.setState({ mode: DetailMode.CloseCourse })}>Kurs abschliessen</Button>}
                    {this.state.mode == DetailMode.CloseCourse && <>
                        <Button onClick={() => this.setState({ closeCourseConfirmOpen: true })}>Absenden</Button>
                        <Modal basic size='small' open={this.state.closeCourseConfirmOpen} onClose={() => this.setState({ closeCourseConfirmOpen: false })}>
                            {this.state.passedParticipants.length === this.props.course.participants.length 
                                ? <><Header icon='student' content='Alle bestanden?' />
                                    <Modal.Content>
                                        <p>Der Kurs wurde von allen bestanden, wollen Sie wirklich abschliessen?</p>
                                    </Modal.Content></>
                                : <><Header icon='warning' content='Nicht alle bestanden?' />
                                    <Modal.Content>
                                        <p>Es haben den Kurs nicht alle bestanden. Ist dies korrekt? Wollen Sie wirklich abschliessen?</p>
                                    </Modal.Content></>}

                            <Modal.Actions>
                                <Button basic color='red' inverted onClick={() => this.setState({ closeCourseConfirmOpen: false })}>
                                    <Icon name='remove' /> Nein
                                </Button>
                                <Button color='green' inverted onClick={this.onClose}>
                                    <Icon name='checkmark' /> Ja
                                </Button>
                            </Modal.Actions>
                        </Modal></>}
                </div>
            </>);
        }
        else {
            return null;
        }
    }

    private orderdParticipants = () => {
        if (this.props.course)
        {
            return sortBy(this.props.course.participants, (c: CourseParticipantDto) => c.name);
        }
        else {
            return [];
        }
    }

    private renderParticipant = (participant: CourseParticipantDto) => {
        return (
            <tr key={participant.id}>
                {this.state.mode == DetailMode.CloseCourse &&
                    <td className='text-center'>
                        <Checkbox
                            name={participant.id}
                            checked={this.state.passedParticipants.some(p => p === participant.id) || false}
                            onChange={(_, p) => this.handlePassedCheckboxChange(participant.id, p)}/>
                    </td>}
                <td>{participant.name}</td>
                <td>{participant.ageGroup}</td>
                <td>{languages[participant.language]}</td>
                <td>{participant.residence}</td>
                <td><a href={'tel:' + participant.phoneNumber}>{participant.phoneNumber}</a></td>
            </tr>
        );
    }
}
