import * as React from 'react';
import { Button, Image, Input, Modal } from 'semantic-ui-react';

import { CourseType, Discipline } from '../../api';
import { NiveauVisualizer } from '../../main/components/NiveauVisualizer';
import { leagueBadges, skiRootQuestion, snowboardRootQuestion } from '../../resources';
import { getEnumElementsAsDropdownItemProps } from '../../utils';
import { ParticipantState } from '../state';
import { NiveauEvaluation } from './NiveauEvaluation';
import './Participant.less';

import './../../assets';
import * as skiSvg from './../../assets/discipline-ski.svg';
import * as snowboardSvg from './../../assets/discipline-snowboard.svg';

export interface ParticipantComponentProps {
    name: string;
    courseType?: CourseType;
    discipline?: Discipline;
    niveauId?: number;
    ageGroup: string;
    change(obj: Partial<ParticipantState>);
    showAllValidationErrors: boolean;
    isNewRow: boolean;
}

export interface ParticipantComponentState {
    isNiveauModalOpen: boolean;
    discipline?: Discipline;
    niveauId?: number;
}

export class Participant extends React.Component<ParticipantComponentProps, ParticipantComponentState> {
    constructor(props: ParticipantComponentProps) {
        super(props);
        this.state = { isNiveauModalOpen: false, discipline: undefined, niveauId: undefined };
    }

    get disciplineOptions() {
        return getEnumElementsAsDropdownItemProps(Discipline);
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.props.change({ [name]: value });
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

    abortCloseNiveauModal = () => {
        this.setState({ isNiveauModalOpen: false, discipline: undefined, niveauId: undefined });
    }

    successCloseNiveauModal = () => {
        this.props.change({ discipline: this.state.discipline, niveauId: this.state.niveauId });
        this.setState({ isNiveauModalOpen: false, discipline: undefined, niveauId: undefined });
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
                <td className='three wide ageGroup'>
                    <Input 
                        placeholder='Jahrgang' 
                        name='ageGroup' 
                        fluid
                        value={this.props.ageGroup}
                        onChange={this.handleChange}
                        error={this.isEmptyAndValidatedOnNotNewRow(p => p.ageGroup)} />
                </td>
                <td className='three wide niveauId'>
                    <NiveauVisualizer
                        onClick={this.openNiveauModal}
                        discipline={this.props.discipline}
                        niveauId={this.props.niveauId} />
                </td>
                <td className='five wide niveau'>
                    <Button fluid onClick={this.openNiveauModal} className={this.hasErrorInModal() ? 'error' : ''}>
                        Stufe ermitteln
                    </Button>
                    <Modal open={this.state.isNiveauModalOpen} onClose={this.abortCloseNiveauModal} dimmer={'blurring'} size='small'>
                        <Modal.Header>
                            Passende Stufe finden
                        </Modal.Header>
                        <Modal.Content>
                            <div className='small lead pb-3'>
                                 Was für eine Sportart?
                            </div>
                            <div className='text-center pb-5'>
                                <Button.Group>
                                    <Button toggle
                                        active={this.state.discipline === Discipline.Ski} 
                                        onClick={() => this.setState({ discipline: Discipline.Ski, niveauId: undefined })}>
                                        <Image src={skiSvg} size='mini' />
                                    </Button>
                                    <Button toggle
                                        active={this.state.discipline === Discipline.Snowboard}
                                        onClick={() => this.setState({ discipline: Discipline.Snowboard, niveauId: undefined })}>
                                        <Image src={snowboardSvg} size='mini' />
                                    </Button>
                                </Button.Group>
                            </div>

                            {this.state.discipline !== undefined && <>
                                <div className='small lead'>
                                    Beantworten Sie die folgenden Fragen, sodass wir <i>{this.props.name}</i> gut Einteilen können.
                                </div>
                                <div className='pb-5'>
                                    <NiveauEvaluation 
                                        question={this.state.discipline === Discipline.Ski ? skiRootQuestion : snowboardRootQuestion}
                                        niveauEvaluated={niveauId => this.setState({ niveauId })} />
                                </div>
                            </>}

                            {this.state.discipline !== undefined && this.state.niveauId !== undefined && <>
                                <div className='small lead pb-3'>
                                    Es ist folgende Stufe geeignet.
                                </div>
                                <div className='pb-2'>
                                    <Image src={leagueBadges[this.state.discipline][this.state.niveauId]} className='m-auto' />
                                </div>
                            </>}
                        </Modal.Content>
                        <Modal.Actions>
                            <Button 
                                onClick={this.abortCloseNiveauModal}>
                                Abbrechen
                            </Button>
                            <Button primary 
                                onClick={this.successCloseNiveauModal}
                                disabled={this.state.discipline === undefined || this.state.niveauId === undefined}>
                                Ok
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </td>
            </tr>
        </>);
    }
}
