import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Button, Dimmer, Loader } from 'semantic-ui-react';

import { State } from '../../state';
import { loadRegistration, submitOrUpdateRegistration } from '../actions';
import { RegistrationContainer } from './RegistrationContainer';

interface InternalOpenRegistrationContainerProps {
    match: match<{ id: string }>;
    id: string | null;
    loadRegistration(id: string);
    updateRegistration(onUpdated?: (id: string) => void);
}

class InternalOpenRegistrationContainer extends React.Component<InternalOpenRegistrationContainerProps> {
    componentDidMount() {
        this.props.loadRegistration(this.props.match.params.id);
    }

    render() {
        if (this.props.id) {
            return (<>
                <RegistrationContainer />
                <Button onClick={() => this.props.updateRegistration(undefined)} />
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
        return { id: state.registration.id };
    },
    { 
        loadRegistration,
        updateRegistration: submitOrUpdateRegistration
    }
)(InternalOpenRegistrationContainer)
