import * as React from 'react';
import { connect } from 'react-redux';

import { RegistrationStatus } from '../../api';
import { State } from '../../main/state';
import { throwIfUndefined } from '../../utils';
import { RegistrationSteps } from '../components/RegistrationSteps';
import { RegistrationStep1Container } from './RegistrationStep1Container';
import { RegistrationStep2Container } from './RegistrationStep2Container';

interface InternalRegistrationContainerProps {
    status: RegistrationStatus;
    applicantGivenname: string;
}

interface InternalRegistrationContainerState {
    status?: RegistrationStatus;
}

class InternalRegistrationContainer extends React.Component<InternalRegistrationContainerProps, InternalRegistrationContainerState> {
    render() {
        const status = throwIfUndefined((this.state || this.props).status);
        const activeSection = status === RegistrationStatus.Registration
            ? (<RegistrationStep1Container />)
            : status === RegistrationStatus.CourseSelection
                ? (<RegistrationStep2Container />)
                : (<h1>Last Step</h1>);

        return (<>
            <RegistrationSteps 
                status={this.props.status}
                activeStatus={status} 
                activeStatusChanged={s => this.setState({ status: s })}
                applicantGivenname={this.props.applicantGivenname} />
            {activeSection}            
        </>);
    }
}

export const RegistrationContainer = connect(
    (state: State): Partial<InternalRegistrationContainerProps> => {
        return { 
            status: state.registration.status,
            applicantGivenname: state.registration.applicant.givenname
        };
    }
)(InternalRegistrationContainer)
