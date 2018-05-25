import * as React from 'react';
import * as H from 'history';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { State } from '../../main/state';
import { showAllValidationErrors, submitOrUpdateRegistration } from '../actions';
import { RegistrationState, hasAllForRegistration, hasAllForRegistrationParticipant } from '../state';
import { RegistrationContainer } from './RegistrationContainer';

interface InternalRegisterContainerProps {
    
    showAllValidationErrors(shouldFullyValidate: boolean);
    submitRegistration(onSubmitted: (id: string) => void);
    registration: RegistrationState;
    history: H.History;
}

class InternalRegisterContainer extends React.Component<InternalRegisterContainerProps> {
    submitRegistrationAndNavigate = () => {
        const r = this.props.registration;
        const isStateValidForSubmitting = hasAllForRegistration(r) && r.participants.every(hasAllForRegistrationParticipant);

        if (isStateValidForSubmitting) {
            const onSubmitted = newId => {
                this.props.history.push('/registration/' + newId);
            };
            
            this.props.submitRegistration(onSubmitted);
        }
        else {
            this.props.showAllValidationErrors(true);
        }
    }

    render() {
        return (<>
            <RegistrationContainer />
            <Button primary className='mt-3' onClick={this.submitRegistrationAndNavigate}>
                Registrieren
            </Button>
        </>);
    }
}

export const RegisterContainer = connect(
    (state: State): Partial<InternalRegisterContainerProps> => {
        return { registration: state.registration };
    },
    {
        showAllValidationErrors,
        submitRegistration: submitOrUpdateRegistration
    }
)(InternalRegisterContainer)
