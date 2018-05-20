import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../state';
import { applicantChange, availabilityChange, changePartipiant } from '../actions';
import { Applicant, ApplicantProps } from '../components/Applicant';
import { AvailabilitySelector, AvailabilitySelectorProps } from '../components/AvailabilitySelector';
import { PartipiantList, PartipiantListProps } from '../components/PartipiantList';

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
        return {
            partipiants: state.registration.partipiants
        };
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
