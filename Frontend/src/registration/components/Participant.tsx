import * as React from 'react';
import { Dropdown, DropdownItemProps, Input, Modal, Icon, Button, Header, Image, Form } from 'semantic-ui-react';

import { CourseType, Discipline } from '../../api';
import { fromDropdownValue, getEnumElementsAsDropdownItemProps, toDropdownValue } from '../../utils';
import { ParticipantState } from '../state';
import { NiveauVisualizer } from '../../main/components/NiveauVisualizer';
import './Participant.less';

export interface ParticipantProps {
    name: string;
    courseType?: CourseType;
    discipline?: Discipline;
    niveauId?: number;
    ageGroup: string;
    change(obj: Partial<ParticipantState>);
    showAllValidationErrors: boolean;
    isNewRow: boolean;
}

export interface ParticipantCState {
    isNiveauModalOpen: boolean;
}

export class Participant extends React.Component<ParticipantProps, ParticipantCState> {
    constructor(props: ParticipantProps) {
        super(props);
        this.state = { isNiveauModalOpen: false };
    }

    get disciplineOptions() {
        return getEnumElementsAsDropdownItemProps(Discipline);
    }

    get niveauOptions(): DropdownItemProps[] {
        return [
            { text: "Kids Village", value: toDropdownValue(100) },
            { text: "Blue Prince/Princess", value: toDropdownValue(110) },
            { text: "Blue King/Queen", value: toDropdownValue(111) },
            { text: "Blue Star", value: toDropdownValue(112) },
        ];
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.props.change({ [name]: value });
    }

    handleDropdownValueChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.props.change({ [name]: fromDropdownValue(parseInt(value)) });
    }

    isEmptyAndValidatedOnNotNewRow = (propertySelector: (ApplicantProps) => any) => {
        const propertyValue = propertySelector(this.props);
        const isEmpty = typeof(propertyValue) === "number" ? propertyValue == null : !propertyValue;
        const fullyValidated = this.props.showAllValidationErrors;
        return isEmpty && fullyValidated && !this.props.isNewRow;
    }

    hasErrorInModal = () => {
        return this.isEmptyAndValidatedOnNotNewRow(p => p.discipline) || this.isEmptyAndValidatedOnNotNewRow(p => p.niveauId)
    }

    openNiveauModal = () => {
        this.setState({ isNiveauModalOpen: true });
    }

    closeNiveauModal = () => {
        this.setState({ isNiveauModalOpen: false });
    }

    render() {
        return (<>
            <tr>
                <td className='five wide'>
                    <Input 
                        placeholder='Name'
                        name='name'
                        fluid
                        value={this.props.name}
                        onChange={this.handleChange}
                        error={this.isEmptyAndValidatedOnNotNewRow(p => p.name)} /></td>
                <td className='three wide'>
                    <Input 
                        placeholder='Jahrgang' 
                        name='ageGroup' 
                        fluid
                        value={this.props.ageGroup} 
                        onChange={this.handleChange}
                        error={this.isEmptyAndValidatedOnNotNewRow(p => p.ageGroup)} />
                </td>
                <td className='three wide'>
                    <NiveauVisualizer discipline={this.props.discipline} niveauId={this.props.niveauId} />
                    <Button onClick={this.openNiveauModal} fluid basic>
                        X
                    </Button>
                </td>
                <td className='five wide niveau'>
                    <Button fluid onClick={this.openNiveauModal} className={this.hasErrorInModal() ? 'error' : ''}>
                        Stufe ermitteln
                    </Button>
                    <Modal open={this.state.isNiveauModalOpen} onOpen={this.openNiveauModal} onClose={this.closeNiveauModal} dimmer={'blurring'} size='small'>
                        <Modal.Header>
                            Passende Stufe finden
                        </Modal.Header>
                        <Modal.Content>
                            <div className='small lead pb-3'>
                                 Beantworten Sie die folgenden Fragen, sodass wir <i>{this.props.name}</i> gut Einteilen können.
                            </div>
                            <div>
                                <Form className='tablet column'>
                                    <Form.Field required>
                                        <label>Disziplin</label>
                                        <Dropdown 
                                            placeholder='Disziplin'
                                            name='discipline' 
                                            selection fluid
                                            options={this.disciplineOptions}
                                            value={toDropdownValue(this.props.discipline)}
                                            selectOnBlur={false}
                                            onChange={this.handleDropdownValueChange}
                                            error={this.isEmptyAndValidatedOnNotNewRow(p => p.discipline)} />
                                    </Form.Field>
                                    <Form.Field required>
                                        <label>Niveau</label>
                                        <Dropdown 
                                            placeholder='Niveau'
                                            name='niveauId' 
                                            selection fluid
                                            options={this.niveauOptions}
                                            value={toDropdownValue(this.props.niveauId)}
                                            selectOnBlur={false}
                                            onChange={this.handleDropdownValueChange}
                                            error={this.isEmptyAndValidatedOnNotNewRow(p => p.niveauId)} />
                                    </Form.Field>
                                </Form>
                            </div>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button primary onClick={this.closeNiveauModal}>
                                Ok
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </td>
            </tr>
        </>);
    }
}
