import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { applicantChange, availabilityChange, changePartipiant, loadRegistration } from '../actions';
import { State } from '../state';
import { Applicant } from '../components/Applicant';
import { AvailabilitySelector } from '../components/AvailabilitySelector';
import { PartipiantList } from '../components/PartipiantList';

const ApplicantContainer = connect(
    (state: State) => {
        return state.applicant;
    },
    (dispatch: Dispatch) => {
        return {
            change: applicantChange(dispatch)
        };
    }
)(Applicant)

const AvailabilitySelectorContainer = connect(
    (state: State) => {
        return state.availability;
    },
    (dispatch: Dispatch) => {
        return {
            change: availabilityChange(dispatch)
        };
    }
)(AvailabilitySelector)

const PartipiantListContainer = connect(
    (state: State) => {
        return { partipiants: state.partipiants };
    },
    (dispatch: Dispatch) => {
        return {
            changePartipiant: changePartipiant(dispatch)
        };
    }
)(PartipiantList)

export class RegistrationContainer extends React.Component {
    render() {
        return (<>
            <ApplicantContainer/>
            <AvailabilitySelectorContainer />
            <PartipiantListContainer />
        </>);
    }
}

export interface OpenRegistrationContainerProps {
    match: { params: { id: string } }
    loadRegistration(id: string);
}

export class OpenRegistration extends React.Component<OpenRegistrationContainerProps> {
    componentDidMount() {
        this.props.loadRegistration(this.props.match.params.id);

    }

    render() {
        console.log(this.props.match.params.id);
        return (<>
            <div>Lol</div>
        </>);
    }
}

export const OpenRegistrationContainer = connect(
    (state: State) => {
        return {};
    },
    (dispatch: Dispatch) => {
        return {
            loadRegistration: loadRegistration(dispatch)
        };
    }
)(OpenRegistration)