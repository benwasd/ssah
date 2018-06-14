import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button } from 'semantic-ui-react';

import { RegistrationStatus } from '../../api';
import { State } from '../../main/state';
import { throwIfUndefined } from '../../utils';
import { showAllValidationErrors, submitOrUpdateRegistration, loadRegistration, unsetRegistration, courseSelected, commitRegistration} from '../actions';
import { RegistrationSteps } from '../components/RegistrationSteps';
import { RegistrationState, hasAllForRegistration, hasAllForRegistrationParticipant, hasCourseSelectionForAllParticipants } from '../state';
import { RegistrationStep1Container } from './RegistrationStep1Container';
import { RegistrationStep2Container } from './RegistrationStep2Container';
import { RegistrationStep3Container } from './RegistrationStep3Container';
import { RegistrationStep4Container } from './RegistrationStep4Container';

interface InternalRegistrationContainerProps extends RouteComponentProps<{ id: string | null }> {
    registration: RegistrationState;
    showAllValidationErrors(shouldFullyValidate: boolean);
    submitOrUpdateRegistration(onSubmittedOrUpdated?: (id: string) => void);
    loadRegistration(id: string);
    unsetRegistration();
    courseSelected();
    commitRegistration(onCommitted?: () => void);
}

interface InternalRegistrationContainerState {
    status?: RegistrationStatus;
}

class InternalRegistrationContainer extends React.Component<InternalRegistrationContainerProps, InternalRegistrationContainerState> {    
    private unsubscribeHistoryListen: () => void;

    constructor(props: InternalRegistrationContainerProps) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.handleNavigate(this.props.location.pathname);
        this.unsubscribeHistoryListen = this.props.history
            .listen((location, action) => this.handleNavigate(location.pathname));
    }
    
    componentWillUnmount() {
        this.unsubscribeHistoryListen();
    }

    handleNavigate(pathname: string) {
        if (pathname.toLowerCase() === '/register') {
            this.props.unsetRegistration();
            this.unsetStatus();
        }
        else if (pathname.toLowerCase().startsWith('/registration/') && this.props.match.params.id) {
            this.props.loadRegistration(this.props.match.params.id);
        }
    }

    submitOrUpdate = () => {
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
            this.props.showAllValidationErrors(false);    
            this.props.submitOrUpdateRegistration(onSubmitted);
            this.unsetStatus();
        }
        else {
            this.props.showAllValidationErrors(true);
        }
    }

    courseSelected = () => {
        const areCoursesSelected = hasCourseSelectionForAllParticipants(this.props.registration);
        
        if (areCoursesSelected) {
            this.props.showAllValidationErrors(false);
            this.props.courseSelected();
            this.unsetStatus();
        }
        else {
            this.props.showAllValidationErrors(true);
        }
    }

    commit = () => {
        const onCommitted = () => {
            this.props.loadRegistration(throwIfUndefined(this.props.registration.id));
        }

        this.props.commitRegistration(onCommitted);
    }

    render() {
        const status = this.getStatus();
        const activeSection = status === RegistrationStatus.Registration
            ? <RegistrationStep1Container />
            : status === RegistrationStatus.CourseSelection
                ? <RegistrationStep2Container />
                : status === RegistrationStatus.Commitment
                    ? (<RegistrationStep3Container />)
                    : (<RegistrationStep4Container />);

        return (<>
            <RegistrationSteps 
                status={this.props.registration.status}
                activeStatus={status} 
                activeStatusChanged={s => this.setStatus(s)}
                applicantGivenname={this.props.registration.applicant.givenname} />
            {activeSection}
            {status === RegistrationStatus.Registration &&
                <Button primary onClick={this.submitOrUpdate} className='mt-3'>
                    {this.props.registration.id ? 'Aktualisieren & Weiter' : 'Registrieren'}
                </Button>}
            {status === RegistrationStatus.CourseSelection && this.props.registration.possibleCourses.length > 0 &&
                <Button primary onClick={this.courseSelected} className='mt-3'>
                    Weiter
                </Button>}
            {status === RegistrationStatus.Commitment &&
                <Button primary onClick={this.commit} className='mt-3' size='large'>
                    Bestätigen
                </Button>}
        </>);
    }

    private getStatus(): RegistrationStatus {
        if (this.state.status === undefined) {
            return this.props.registration.status;
        }
        else {
            return this.state.status;
        }
    }

    private setStatus(status: RegistrationStatus) {
        if (status === this.props.registration.status) {
            this.setState({ status: undefined });
        }
        else {
            this.setState({ status })
        }
    }

    private unsetStatus() {
        this.setState({ status: undefined });
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
        courseSelected,
        commitRegistration
    }
)(InternalRegistrationContainer)
