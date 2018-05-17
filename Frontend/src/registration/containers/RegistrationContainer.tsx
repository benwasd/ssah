import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { applicantChange, availabilityChange } from '../actions';
import { State } from '../state';
import { Applicant } from '../components/Applicant';
import { AvailabilitySelector } from '../components/AvailabilitySelector';
import { Partipiant } from '../components/Partipiant';

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
        return (<>
            <ApplicantContainer/>
            <AvailabilitySelectorContainer />

            <div className="ui internally celled grid">
                <Partipiant />
            </div>
        </>);
    }
}
