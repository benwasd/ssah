import * as React from 'react';
import { Form } from 'semantic-ui-react';

import { ApplicantState } from '../state';

export interface ApplicantProps {
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    change(obj: Partial<ApplicantState>);
}

export class Applicant extends React.Component<ApplicantProps, Partial<ApplicantProps>> {
    componentDidMount() {
        this.setState({  })
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
    
        this.setState({ [name]: "change" });
        this.props.change({ [name]: value });
    }
    
    isEmptyAndChanged(propertySelector: (ApplicantProps) => string) {
        const isEmpty = propertySelector(this.props) == "";
        const hasChanged = propertySelector(this.state || {}) === "change";
        return isEmpty && hasChanged;
    }

    render() {
        return (
            <Form>
                <Form.Field required>
                    <label>Mobile</label>
                    <Form.Input placeholder='+41 79 450 12 13' name='phoneNumber' value={this.props.phoneNumber} onChange={this.handleInputChange} error={this.isEmptyAndChanged(p => p.phoneNumber)} />
                </Form.Field>
                <Form.Field required>
                    <label>Vorname</label>
                    <Form.Input placeholder='Peter' name='givenname' value={this.props.givenname} onChange={this.handleInputChange} error={this.isEmptyAndChanged(p => p.givenname)} />
                </Form.Field>
                <Form.Field required>
                    <label>Nachname</label>
                    <Form.Input placeholder='Muster' name='surname' value={this.props.surname} onChange={this.handleInputChange} error={this.isEmptyAndChanged(p => p.surname)} />
                </Form.Field>
                <Form.Field required>
                    <label>Ort</label>
                    <Form.Input placeholder='Hotel Bellvue' name='residence' value={this.props.residence} onChange={this.handleInputChange} error={this.isEmptyAndChanged(p => p.residence)} />
                </Form.Field>
            </Form>
        );
    }
}
