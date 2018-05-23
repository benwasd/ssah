import * as React from 'react';
import { connect } from 'react-redux';

import { State } from '../../main/state';
import { applicantChange, availabilityChange, changeParticipant } from '../actions';
import { Applicant, ApplicantProps } from '../components/Applicant';
import { AvailabilitySelector, AvailabilitySelectorProps } from '../components/AvailabilitySelector';
import { ParticipantList, ParticipantListProps } from '../components/ParticipantList';

const ApplicantContainer = connect(
    (state: State): Partial<ApplicantProps> => state.registration.applicant,
    { change: applicantChange }
)(Applicant)

const AvailabilitySelectorContainer = connect(
    (state: State): Partial<AvailabilitySelectorProps> => state.registration.availability,
    { change: availabilityChange }
)(AvailabilitySelector)

const ParticipantListContainer = connect(
    (state: State): Partial<ParticipantListProps> => {
        return {
            participants: state.registration.participants
        };
    },
    { changeParticipant }
)(ParticipantList)

export class RegistrationStep1Container extends React.Component {
    render() {
        return (<>
            <ApplicantContainer/>
            <AvailabilitySelectorContainer />
            <ParticipantListContainer />
        </>);
    }
}
