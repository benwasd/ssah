import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button } from 'semantic-ui-react';

import { RegistrationStatus } from '../../api';
import { State } from '../../main/state';
import { throwIfUndefined } from '../../utils';
import { showAllValidationErrors, submitOrUpdateRegistration, loadRegistration, unsetRegistration, commitRegistration} from '../actions';
import { RegistrationSteps } from '../components/RegistrationSteps';
import { hasAllForRegistration, hasAllForRegistrationParticipant, RegistrationState } from '../state';
import { RegistrationStep1Container } from './RegistrationStep1Container';
import { RegistrationStep2Container } from './RegistrationStep2Container';

interface InternalRegistrationContainerProps extends RouteComponentProps<{ id: string | null }> {
    registration: RegistrationState;
    showAllValidationErrors(shouldFullyValidate: boolean);
    submitOrUpdateRegistration(onSubmittedOrUpdated?: (id: string) => void);
    loadRegistration(id: string);
    unsetRegistration();
    commitRegistration(onCommitted?: () => void);
}

interface InternalRegistrationContainerState {
    status?: RegistrationStatus;
}

class InternalRegistrationContainer extends React.Component<InternalRegistrationContainerProps, InternalRegistrationContainerState> {    
    unsubscribeHistoryListen: () => void;

    constructor(props: InternalRegistrationContainerProps) {
        super(props);
    }

    componentWillMount() {
        this.initStateByPathname(this.props.location.pathname);
        this.unsubscribeHistoryListen = this.props.history
            .listen((location, action) => this.initStateByPathname(location.pathname));
    }
    
    componentWillUnmount() {
        this.unsubscribeHistoryListen();
    }

    initStateByPathname(pathname: string) {
        if (pathname.toLowerCase() === '/register') {
            this.props.unsetRegistration();
            this.setState(null);
        }
        else if (pathname.toLowerCase().startsWith('/registration/') && this.props.match.params.id) {
            this.props.loadRegistration(this.props.match.params.id);
        }
    }

    submitOrUpdateAndNavigate = () => {
        const onSubmitted = newId => {
            if (this.props.match.params.id !== newId) {
                this.props.history.push('/registration/' + newId);
            }

            // reload
            this.props.loadRegistration(newId);
        };

        const r = this.props.registration;
        const isStateValidForSubmitting = hasAllForRegistration(r) && r.participants.every(hasAllForRegistrationParticipant);
        
        if (isStateValidForSubmitting) {            
            this.props.submitOrUpdateRegistration(onSubmitted);
        }
        else {
            this.props.showAllValidationErrors(true);
        }
    }

    commitAndNavigate = () => {
        const onCommitted = () => {
            this.props.loadRegistration(throwIfUndefined(this.props.registration.id));
        }

        this.props.commitRegistration(onCommitted);
    }

    render() {
        const status = throwIfUndefined((this.state || this.props.registration).status);
        const activeSection = status === RegistrationStatus.Registration
            ? (<RegistrationStep1Container />)
            : status === RegistrationStatus.CourseSelection
                ? (<RegistrationStep2Container />)
                : (<h1></h1>);

        return (<>
            <RegistrationSteps 
                status={this.props.registration.status}
                activeStatus={status} 
                activeStatusChanged={s => this.setState({ status: s })}
                applicantGivenname={this.props.registration.applicant.givenname} />
            {activeSection}
            {status === RegistrationStatus.Registration &&
                <Button primary onClick={this.submitOrUpdateAndNavigate} className='mt-3'>
                    {this.props.registration.id ? 'Aktualisieren' : 'Registrieren'}
                </Button>}
            {status === RegistrationStatus.CourseSelection &&
                <Button primary onClick={this.commitAndNavigate} className='mt-3'>
                    Bestätigen
                </Button>}
        </>);
    }
}

export const RegistrationContainer = connect(
    (state: State): Partial<InternalRegistrationContainerProps> => {
        return { 
            registration: state.registration
        };
    },
    {
        showAllValidationErrors,
        submitOrUpdateRegistration,
        loadRegistration,
        unsetRegistration,
        commitRegistration
    }
)(InternalRegistrationContainer)
