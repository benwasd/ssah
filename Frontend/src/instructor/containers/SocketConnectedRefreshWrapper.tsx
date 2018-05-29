import * as React from 'react';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { connect } from 'react-redux';

import { State } from '../../main/state';
import { baseApiUrl } from '../../resources';
import { reloadCourse } from '../actions';

interface InternalSocketConnectedRefreshWrapper {
    reloadCourse(instructorId: string, courseId: string);
}

class InternalSocketConnectedRefreshWrapper extends React.Component<InternalSocketConnectedRefreshWrapper> {
    connection: HubConnection | null;

    componentWillMount() {
        this.connection = new HubConnectionBuilder()
            .withUrl(baseApiUrl + "/courseChange")
            .build();

        this.connection.on("Notify", (messageType: string, instructorId: string, courseId: string) => {
            console.log(messageType, instructorId, courseId);
            this.props.reloadCourse(instructorId, courseId);
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
        };
    },
    { 
        reloadCourse
    }
)(InternalSocketConnectedRefreshWrapper)
