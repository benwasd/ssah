import * as React from 'react';

import { RegistrationStatus } from '../../api';

export interface RegistrationStepsProps {
    status: RegistrationStatus;
    activeStatus: RegistrationStatus;
    activeStatusChanged: (status: RegistrationStatus) => void;
}

export class RegistrationSteps extends React.Component<RegistrationStepsProps> {
    getStepClassName = (status: RegistrationStatus) => {
        let result = "step";
        if (status > this.props.status) {
            result += " disabled";
        }
        if (status === this.props.activeStatus) {
            result += " active";
        }

        return result;
    }

    getChangeStepFunc = (status: RegistrationStatus) => () => {
        this.props.activeStatusChanged(status);
    }

    render() {
        return (<>
            <div className="ui steps fluid unstackable">
                <a className={this.getStepClassName(RegistrationStatus.Registration)}
                   onClick={this.getChangeStepFunc(RegistrationStatus.Registration)}>
                    <i className="truck icon"></i>
                    <div className="content">
                        <div className="title">Registrierung</div>
                    </div>
                </a>
                <a className={this.getStepClassName(RegistrationStatus.CourseSelection)}
                   onClick={this.getChangeStepFunc(RegistrationStatus.CourseSelection)}>
                    <i className="payment icon"></i>
                    <div className="content">
                        <div className="title">Kursauswahl</div>
                    </div>
                </a>
                <a className={this.getStepClassName(RegistrationStatus.Commitment)}
                   onClick={this.getChangeStepFunc(RegistrationStatus.Commitment)}>
                    <i className="info icon"></i>
                    <div className="content">
                        <div className="title">Bestätigung</div>
                    </div>
                </a>
            </div>    
        </>);
    }
}
