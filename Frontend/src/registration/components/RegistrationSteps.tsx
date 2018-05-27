import * as React from 'react';

import { RegistrationStatus } from '../../api';
import './RegistrationSteps.less';

export interface RegistrationStepsProps {
    status: RegistrationStatus;
    activeStatus: RegistrationStatus;
    activeStatusChanged: (status: RegistrationStatus) => void;
    applicantGivenname: string;
}

export class RegistrationSteps extends React.Component<RegistrationStepsProps> {
    render() {
        let heading;
        let leadText;
        let navigationDisabled = '';

        if (this.props.status === RegistrationStatus.Registration) {
            heading = "Willkommen";
            leadText = "Melden Sie sich und ihre Familie für einen Kurs an.";
        }
        else if (this.props.status === RegistrationStatus.CourseSelection) {
            heading = "Hallo " + this.props.applicantGivenname;
            leadText = "Schön, machen Sie den Ersten Schritt in den Schnee.";
        }
        else if (this.props.status === RegistrationStatus.Commitment) {
            heading = "Hallo " + this.props.applicantGivenname;
            leadText = "Schön, machen Sie den Ersten Schritt in den Schnee.";
        }
        else {
            heading = "Geschafft";
            leadText = "Wir freuen uns auf Sie.";
            navigationDisabled = ' nonavigate';
        }

        return (<>
            <div className="registration head">
                <h1 className='mb-0'>{heading}</h1>
                <p className="lead">{leadText}</p>
            </div>
            <div className={'ui steps fluid unstackable' + navigationDisabled}>
                <a className={this.getStepClassName(RegistrationStatus.Registration)}
                   onClick={this.getChangeStepFunc(RegistrationStatus.Registration)}>
                    <i className="user icon"></i>
                    <div className="content shorter">
                        <div className="title">Registrieren</div>
                        <div className="description">Alles, um Sie kennen zu lernen</div>
                    </div>
                </a>
                <a className={this.getStepClassName(RegistrationStatus.CourseSelection)}
                   onClick={this.getChangeStepFunc(RegistrationStatus.CourseSelection)}>
                    <i className="calendar alternate outline icon"></i>
                    <div className="content">
                        <div className="title">Kursauswahl</div>
                        <div className="description">Wählen Sie den passenden Kurs</div>
                    </div>
                </a>
                <a className={this.getStepClassName(RegistrationStatus.Commitment)}
                   onClick={this.getChangeStepFunc(RegistrationStatus.Commitment)}>
                    <i className="handshake outline icon"></i>
                    <div className="content longer">
                        <div className="title">Bestätigung</div>
                        <div className="description">Kontrollieren und definitiv Anmelden</div>
                    </div>
                </a>
            </div>    
        </>);
    }

    private getStepClassName = (status: RegistrationStatus) => {
        let result = "step";

        if (status > this.props.status) {
            result += " disabled";
        }
        if (status === this.props.status) {
            result += " active";
        }
        if (status < this.props.status) {
            result += " completed";
        }

        return result;
    }

    private getChangeStepFunc = (status: RegistrationStatus) => () => {
        this.props.activeStatusChanged(status);
    }
}
