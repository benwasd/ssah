import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { applicantChange, availabilityChange, changePartipiant } from '../actions';
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
