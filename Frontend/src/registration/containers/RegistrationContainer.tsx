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
        return (
            <div>
                <ApplicantContainer/>
                <AvailabilitySelectorContainer />
                <table className='ui definition table'>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Arguments</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>reset rating</td>
                            <td>None</td>
                            <td>Resets rating to default value</td>
                        </tr>
                        <Partipiant />
                    </tbody>
                </table>
                
            </div>
        )
    }
}
