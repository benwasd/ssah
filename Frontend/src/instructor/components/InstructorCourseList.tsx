import * as React from 'react';
import * as moment from 'moment';

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
        return (
            <div className="ui relaxed divided list">
                <i className="france flag"></i>
                <i className="myanmar flag"></i>
                {this.props.courses.map(this.renderCourse)}
            </div>
        );
        // return this.props.courses.map(c => <div key={c.id}>{c.participants.map(p => p.name).join(',')}</div>)
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
}
