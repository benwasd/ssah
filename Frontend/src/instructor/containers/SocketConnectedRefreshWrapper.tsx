import * as React from 'react';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { connect } from 'react-redux';

import { State } from '../../main/state';
import { loadCourse } from '../actions';

interface InternalSocketConnectedRefreshWrapper {
    currentInstructorId: string;
    loadCourse(courseId: string);
}

class InternalSocketConnectedRefreshWrapper extends React.Component<InternalSocketConnectedRefreshWrapper> {
    connection: HubConnection | null;

    componentWillMount() {
        this.connection = new HubConnectionBuilder()
            .withUrl("http://localhost:51474/courseChange")
            .build();

        this.connection.on("Notify", (messageType: string, instructorId: string, courseId: string) => {
            if (!this.props.currentInstructorId || !instructorId || this.props.currentInstructorId.toUpperCase() != instructorId.toUpperCase()) {
                return;
            }
            else {
                this.props.loadCourse(courseId);
            }
        });

        this.connection.start();
    }

    componentWillUnmount() {
        if (this.connection) {
            this.connection.stop();
            this.connection = null;
        }
    }

    render() {
        return this.props.children
    }
}

export const SocketConnectedRefreshWrapper = connect(
    (state: State): Partial<InternalSocketConnectedRefreshWrapper> => {
        return { 
            currentInstructorId: state.instructor.instructorId
        };
    },
    { 
        loadCourse
    }
)(InternalSocketConnectedRefreshWrapper)
