import * as React from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

import { ApplicantState } from '../state';
import { toDropdownValue, getEnumElementsAsDropdownItemProps, fromDropdownValue } from '../../utils';
import { Language } from '../../api';

export interface ApplicantProps {
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    language?: Language;
    preferSimultaneousCourseExecutionForPartipiants: boolean;
    change(obj: Partial<ApplicantState>);
}

export class Applicant extends React.Component<ApplicantProps, Partial<ApplicantProps>> {
    handleChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.setState({ [name]: "change" });
        this.props.change({ [name]: value });
    }
        
    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, { name, checked }) => {
        this.setState({ [name]: "change" });
        this.props.change({ [name]: checked });
    }

    handleDropdownValueChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.props.change({ [name]: fromDropdownValue(parseInt(value)) });
    }
    
    isEmptyAndChanged = (propertySelector: (ApplicantProps) => string) => {
        const isEmpty = propertySelector(this.props) == "";
        const hasChanged = propertySelector(this.state || {}) === "change";
        return isEmpty && hasChanged;
    }

    get languageOptions() {
        return getEnumElementsAsDropdownItemProps(Language, ["Schweizerdeutsch", "Deutsch", "Französisch", "Italienisch", "Englisch", "Russisch"]);
    }

    render() {
        return (
            <Form>
                <Form.Field required>
                    <label>Mobile</label>
                    <Form.Input placeholder='+41 79 450 12 13' name='phoneNumber' value={this.props.phoneNumber} onChange={this.handleChange} error={this.isEmptyAndChanged(p => p.phoneNumber)} />
                </Form.Field>
                <Form.Field required>
                    <label>Vorname</label>
                    <Form.Input placeholder='Peter' name='givenname' value={this.props.givenname} onChange={this.handleChange} error={this.isEmptyAndChanged(p => p.givenname)} />
                </Form.Field>
                <Form.Field required>
                    <label>Nachname</label>
                    <Form.Input placeholder='Muster' name='surname' value={this.props.surname} onChange={this.handleChange} error={this.isEmptyAndChanged(p => p.surname)} />
                </Form.Field>
                <Form.Field required>
                    <label>Ort</label>
                    <Form.Input placeholder='Hotel Bellvue' name='residence' value={this.props.residence} onChange={this.handleChange} error={this.isEmptyAndChanged(p => p.residence)} />
                </Form.Field>
                <Form.Field required>
                    <label>Sprache</label>
                    <Form.Dropdown name='language' placeholder='Kurstyp' selection options={this.languageOptions} value={toDropdownValue(this.props.language)} selectOnBlur={false} onChange={this.handleDropdownValueChange} error={this.isEmptyAndChanged(p => p.language)} fluid />
                </Form.Field>
                <Form.Field>
                    <label>Nur gleichzeitige Kurse</label>
                    <Checkbox name='preferSimultaneousCourseExecutionForPartipiants' checked={this.props.preferSimultaneousCourseExecutionForPartipiants} onChange={this.handleCheckboxChange} />
                </Form.Field>
            </Form>
        );
    }
}
