import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { sortBy } from 'lodash';

import { CourseDto } from '../../api';
import { NiveauVisualizer } from '../../main/components/NiveauVisualizer';
import { courseTypes } from '../../resources';

export interface CourseListProps {
    loggedInInstructorName: string;
    courses: CourseDto[];
    loadCourses();
}

export class CourseList extends React.Component<CourseListProps> {
    componentDidMount() {
        this.props.loadCourses();
    }

    render() {
        return (<>
            <h2>Hallo {this.props.loggedInInstructorName}</h2>
            <h3 className='mt-0'>Zukünftige Kurse</h3>
            <div className="ui relaxed divided list">
                {this.noEntriesIfEmpty(this.orderdFutureCourses().map(this.renderCourse))}
            </div>
            <h3>Vergangene Kurse</h3>
            <div className="ui relaxed divided list">
                {this.noEntriesIfEmpty(this.orderdPastCourses().map(this.renderCourse))}
            </div>
        </>);
    }

    private orderdFutureCourses = () => {
        const currentTime = new Date().getTime();
        return sortBy(this.props.courses, (c: CourseDto) => c.actualCourseStart).filter(c => c.actualCourseStart.getTime() > currentTime);
    }

    private orderdPastCourses = () => {
        const currentTime = new Date().getTime();
        return sortBy(this.props.courses, (c: CourseDto) => c.actualCourseStart).filter(c => c.actualCourseStart.getTime() <= currentTime);
    }

    private renderCourse = (course: CourseDto) => {
        return (
            <div className="item" key={course.id}>
                <div className="right floated content">
                    <NiveauVisualizer discipline={course.discipline} niveauId={course.niveauId} />
                </div>
                <div className="middle aligned content">
                    <Link className="header" to={"/course/" + course.id}>{courseTypes[course.courseType]} mit {course.participants.length} Teilnehmer, Start {moment(course.actualCourseStart).format('LLLL')}</Link>
                    <div className="description">Zuletzt aktualisiert {moment(course.lastModificationDate).fromNow()} ({moment(course.lastModificationDate).format('LLL')})</div>
                </div>
            </div>
        );
    }

    private noEntriesIfEmpty(elements: any[]) {
        if (elements.length === 0) {
            return [<div key={"0"}>Keine Kurse vorhanden.</div>];
        }
        else {
            return elements;
        }
    }
}
