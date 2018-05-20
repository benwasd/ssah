import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

import { State } from '../../state';
import { submitOrUpdateRegistration } from '../actions';
import { RegistrationContainer } from '../containers/RegistrationContainer';

interface InternalRegisterContainerProps {
    submitRegistration();
}

class InternalRegisterContainer extends React.Component<InternalRegisterContainerProps> {
    render() {
        return (<>
            <RegistrationContainer />
            <Button onClick={this.props.submitRegistration} value='Abschicken' />
        </>);
    }
}

export const RegisterContainer = connect(
    (state: State): Partial<InternalRegisterContainerProps> => {
        return { };
    },
    { submitRegistration: submitOrUpdateRegistration }
)(InternalRegisterContainer)
