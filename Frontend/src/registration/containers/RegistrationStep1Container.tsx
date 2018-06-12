import * as React from 'react';
import { connect } from 'react-redux';
import { Divider, Grid } from 'semantic-ui-react';
import update from 'immutability-helper';

import { State } from '../../main/state';
import { applicantChange, availabilityChange, changeParticipant } from '../actions';
import { Applicant, ApplicantProps } from '../components/Applicant';
import { HowItWorksCard } from '../components/HowItWorksCard';
import { AvailabilitySelector, AvailabilitySelectorProps } from '../components/AvailabilitySelector';
import { ParticipantList, ParticipantListProps } from '../components/ParticipantList';

const ApplicantContainer = connect(
    (state: State): Partial<ApplicantProps> => update(state.registration.applicant, { $merge: { showAllValidationErrors: state.registration.showAllValidationErrors } }),
    { change: applicantChange }
)(Applicant)

const AvailabilitySelectorContainer = connect(
    (state: State): Partial<AvailabilitySelectorProps> => update(state.registration.availability, { $merge: { showAllValidationErrors: state.registration.showAllValidationErrors } }),
    { change: availabilityChange }
)(AvailabilitySelector)

const ParticipantListContainer = connect(
    (state: State): Partial<ParticipantListProps> => {
        return {
            participants: state.registration.participants,
            showAllValidationErrors: state.registration.showAllValidationErrors
        };
    },
    { changeParticipant }
)(ParticipantList)

export class RegistrationStep1Container extends React.Component {
    render() {
        return (<>
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={10}> 
                    <ApplicantContainer />
                    <AvailabilitySelectorContainer />
                </Grid.Column>
                <Grid.Column floated='right' only='large screen' computer={5}>
                    <HowItWorksCard />
                </Grid.Column>
                <Grid.Column width={16}>
                </Grid.Column>
                <Grid.Column width={16}>
                    <ParticipantListContainer />
                </Grid.Column>
            </Grid>
        </>);
    }
}
