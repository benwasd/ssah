import * as React from 'react';

import { CourseDto } from '../../api';

export interface InstructorCourseListProps {
    courses: CourseDto[];
    loadCourses();
}

export class InstructorCourseList extends React.Component<InstructorCourseListProps> {
    componentDidMount() {
        this.props.loadCourses();
    }

    render() {
        return this.props.courses.map(c => <div key={c.id}>{c.participants.map(p => p.name).join(',')}</div>)
    }
}
