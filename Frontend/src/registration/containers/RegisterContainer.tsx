import * as React from 'react';
import * as H from 'history';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { State } from '../../state';
import { submitOrUpdateRegistration } from '../actions';
import { RegistrationContainer } from '../containers/RegistrationContainer';

interface InternalRegisterContainerProps {
    submitRegistration(submittedCallback: (id: string) => void);
    history: H.History;
}

class InternalRegisterContainer extends React.Component<InternalRegisterContainerProps> {
    submitRegistrationAndNavigate = () => {
        const onSubmitted = newId => this.props.history.push('/registration/' + newId);
        this.props.submitRegistration(onSubmitted);
    }

    render() {
        return (<>
            <RegistrationContainer />
            <Button onClick={this.submitRegistrationAndNavigate} value='Abschicken' />
        </>);
    }
}

export const RegisterContainer = connect(
    (state: State): Partial<InternalRegisterContainerProps> => {
        return { };
    },
    { submitRegistration: submitOrUpdateRegistration }
)(InternalRegisterContainer)
