import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Button, Dimmer, Loader } from 'semantic-ui-react';

import { State } from '../../main/state';
import { commitRegistration, loadRegistration, submitOrUpdateRegistration } from '../actions';
import { RegistrationContainer } from './RegistrationContainer';

interface InternalOpenRegistrationContainerProps {
    match: match<{ id: string }>;
    id: string | null;
    loadRegistration(id: string);
    updateRegistration(onUpdated?: (id: string) => void);
    commitRegistration(onCommitted?: () => void);
}

class InternalOpenRegistrationContainer extends React.Component<InternalOpenRegistrationContainerProps> {
    componentWillMount() {
        this.props.loadRegistration(this.props.match.params.id);
    }

    render() {
        if (this.props.id) {
            return (<>
                <RegistrationContainer />
                <Button onClick={() => this.props.updateRegistration(undefined)}>UPDATE</Button>
                <Button onClick={() => this.props.commitRegistration(undefined)}>COMMIT</Button>
            </>);
        }
        else {
            return (<>
                <Dimmer active>
                    <Loader size='massive'>Loading</Loader>
                </Dimmer>
            </>);
        }
    }
}

export const OpenRegistrationContainer = connect(
    (state: State): Partial<InternalOpenRegistrationContainerProps> => {
        return { 
            id: state.registration.id
        };
    },
    { 
        loadRegistration,
        updateRegistration: submitOrUpdateRegistration,
        commitRegistration
    }
)(InternalOpenRegistrationContainer)
