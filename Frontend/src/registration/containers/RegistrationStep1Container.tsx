import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { applicantChange, availabilityChange, changePartipiant, loadRegistration } from '../actions';
import { State } from '../../state';
import { Applicant, ApplicantProps } from '../components/Applicant';
import { AvailabilitySelector, AvailabilitySelectorProps } from '../components/AvailabilitySelector';
import { PartipiantList, PartipiantListProps } from '../components/PartipiantList';
import { Dimmer, Loader } from 'semantic-ui-react';

const ApplicantContainer = connect(
    (state: State): Partial<ApplicantProps> => state.registration.applicant,
    { change: applicantChange }
)(Applicant)

const AvailabilitySelectorContainer = connect(
    (state: State): Partial<AvailabilitySelectorProps> => state.registration.availability,
    { change: availabilityChange }
)(AvailabilitySelector)

const PartipiantListContainer = connect(
    (state: State): Partial<PartipiantListProps> => {
        return { partipiants: state.registration.partipiants };
    },
    { changePartipiant }
)(PartipiantList)

export class RegistrationStep1Container extends React.Component {
    render() {
        return (<>
            <ApplicantContainer/>
            <AvailabilitySelectorContainer />
            <PartipiantListContainer />
        </>);
    }
}
