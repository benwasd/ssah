import * as React from 'react';
import * as moment from 'moment';
import { sortBy } from 'lodash';

import { CourseDto, Discipline, CourseType } from '../../api';
import { Link } from 'react-router-dom';

export interface InstructorCourseListProps {
    courses: CourseDto[];
    loadCourses();
}

export class InstructorCourseList extends React.Component<InstructorCourseListProps> {
    componentDidMount() {
        this.props.loadCourses();
    }

    render() {
        return (<>
            <h1>Zukünftige Kurse</h1>
            <div className="ui relaxed divided list">
                {this.noEntriesIfEmpty(this.orderdFutureCourses().map(this.renderCourse))}
            </div>
            <h1>Vergangene Kurse</h1>
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
                <i className="large github middle aligned icon"></i>
                <div className="content">
                    <Link className="header" to={"/instructor/course/" + course.id}>{Discipline[course.discipline]} {CourseType[course.courseType]} mit {course.participants.length} Teilnehmer, Start {moment(course.actualCourseStart).format('LLLL')}</Link>
                    <div className="description">Zuletzt aktualisiert {moment(course.lastModificationDate).fromNow()} ({moment(course.lastModificationDate).format('LLL')})</div>
                </div>
            </div>
        );
    }

    private noEntriesIfEmpty(elements: any[]) {
        if (elements.length === 0) {
            return [<div>Keine Kurse vorhanden.</div>];
        }
        else {
            return elements;
        }
    }
}
