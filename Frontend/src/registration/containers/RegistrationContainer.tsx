import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { applicantChange, availabilityChange, changePartipiant, loadRegistration } from '../actions';
import { State } from '../../state';
import { Applicant } from '../components/Applicant';
import { AvailabilitySelector } from '../components/AvailabilitySelector';
import { PartipiantList } from '../components/PartipiantList';
import { Dimmer, Loader } from 'semantic-ui-react';

const ApplicantContainer = connect(
    (state: State) => state.registration.applicant,
    { change: applicantChange }
)(Applicant)

const AvailabilitySelectorContainer = connect(
    (state: State) => state.registration.availability,
    { change: availabilityChange }
)(AvailabilitySelector)

const PartipiantListContainer = connect(
    (state: State) => {
        return { partipiants: state.registration.partipiants };
    },
    { changePartipiant }
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
