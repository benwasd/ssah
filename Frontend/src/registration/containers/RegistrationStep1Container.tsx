import * as React from 'react';
import { connect } from 'react-redux';
import { Divider, Grid } from 'semantic-ui-react';

import { State } from '../../main/state';
import { applicantChange, availabilityChange, changeParticipant } from '../actions';
import { Applicant, ApplicantProps } from '../components/Applicant';
import { ApplicantCard } from '../components/ApplicantCard';
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
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={10}> 
                    <ApplicantContainer/>
                    <AvailabilitySelectorContainer />
                </Grid.Column>
                <Grid.Column floated='right' only='large screen' computer={5}>
                    <ApplicantCard />
                </Grid.Column>
                <Grid.Column width={16}>
                </Grid.Column>
                <Grid.Column width={16}>
                    <div className='lead'>Teilnehmer</div>
                    <ParticipantListContainer />
                </Grid.Column>
            </Grid>
        </>);
    }
}
