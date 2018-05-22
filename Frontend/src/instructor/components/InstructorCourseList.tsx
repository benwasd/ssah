import * as React from 'react';

import { CourseDto } from '../../api';

export interface InstructorCourseListProps {
    courses: CourseDto[];
    loadCourses(instructorId: string);
}

export class InstructorCourseList extends React.Component<InstructorCourseListProps> {
    componentDidMount() {
        this.props.loadCourses("AEEF01D4-14DE-49D1-980A-004AF5135C30");
    }

    render() {
        return this.props.courses.map(c => <div key={c.id}>{c.participants.map(p => p.name).join(',')}</div>)
    }
}
