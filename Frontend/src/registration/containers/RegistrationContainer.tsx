import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { Dimmer, Loader, Button, Step, Icon } from 'semantic-ui-react';

import { State } from '../../state';
import { loadRegistration, submitOrUpdateRegistration } from '../actions';
import { RegistrationStep1Container } from '../containers/RegistrationStep1Container';
import { RegistrationStatus } from '../../api';
import { RegistrationSteps } from '../components/RegistrationSteps';
import { throwIfUndefined } from '../../utils';

interface InternalRegistrationContainerProps {
    status: RegistrationStatus;
}

interface InternalRegistrationContainerState {
    status?: RegistrationStatus;
}

class InternalRegistrationContainer extends React.Component<InternalRegistrationContainerProps, InternalRegistrationContainerState> {
    getStepClassName = (status: RegistrationStatus) => {
        let result = "step";
        if (status > this.props.status) {
            result += " disabled";
        }
        if (status === (this.state || this.props).status) {
            result += " active";
        }

        return result;
    }

    getChangeStepFunc = (status: RegistrationStatus) => () => {
        this.setState({ status });
    }

    render() {
        const status = throwIfUndefined((this.state || this.props).status);
        const activeSection = status === RegistrationStatus.Registration
            ? (<RegistrationStep1Container />)
            : status === RegistrationStatus.CourseSelection
                ? (<div />)
                : (<h1>WUuu</h1>);

        return (<>
            <RegistrationSteps 
                status={this.props.status}
                activeStatus={status} 
                activeStatusChanged={s => this.setState({ status: s })} />
            {activeSection}            
        </>);
    }
}

export const RegistrationContainer = connect(
    (state: State): Partial<InternalRegistrationContainerProps> => {
        return { 
            status: state.registration.status
        };
    }
)(InternalRegistrationContainer)
