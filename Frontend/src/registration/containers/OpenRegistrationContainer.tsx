import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { State } from '../../state';
import { loadRegistration } from '../actions';
import { RegistrationContainer } from '../containers/RegistrationContainer';

interface InternalOpenRegistrationContainerProps {
    match: { params: { id: string } }
    id: string;
    loadRegistration(id: string);
}

class InternalOpenRegistrationContainer extends React.Component<InternalOpenRegistrationContainerProps> {
    componentDidMount() {
        this.props.loadRegistration(this.props.match.params.id);
    }

    render() {
        if (this.props.id) {
            return (<>
                <RegistrationContainer />
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
    { loadRegistration: loadRegistration }
)(InternalOpenRegistrationContainer)
