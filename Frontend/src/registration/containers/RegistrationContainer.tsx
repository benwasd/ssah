import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { applicantChange, availabilityChange } from '../actions';
import { State } from '../state';
import { Applicant } from '../components/Applicant';
import { AvailabilitySelector } from '../components/AvailabilitySelector';

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

export class RegistrationContainer extends React.Component {
    render() {
        return (
            <div>
                <ApplicantContainer/>
                <AvailabilitySelectorContainer />
            </div>
        )
    }
}
