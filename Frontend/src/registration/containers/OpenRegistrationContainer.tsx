import * as React from 'react';
import { connect } from 'react-redux';
import { Dimmer, Loader, Button } from 'semantic-ui-react';

import { State } from '../../state';
import { loadRegistration, submitOrUpdateRegistration } from '../actions';
import { RegistrationContainer } from '../containers/RegistrationContainer';

interface InternalOpenRegistrationContainerProps {
    match: { params: { id: string } }
    id: string;
    loadRegistration(id: string);
    updateRegistration();
}

class InternalOpenRegistrationContainer extends React.Component<InternalOpenRegistrationContainerProps> {
    componentDidMount() {
        this.props.loadRegistration(this.props.match.params.id);
    }

    render() {
        if (this.props.id) {
            return (<>
                <RegistrationContainer />.
                <Button onClick={this.props.updateRegistration} />
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
