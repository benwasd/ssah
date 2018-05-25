import * as React from 'react';
import { Dropdown, DropdownItemProps, Input, Modal, Icon, Button, Header, Image, Form } from 'semantic-ui-react';

import { CourseType, Discipline } from '../../api';
import { fromDropdownValue, getEnumElementsAsDropdownItemProps, toDropdownValue } from '../../utils';
import { ParticipantState } from '../state';

export interface ParticipantProps {
    name: string;
    courseType?: CourseType;
    discipline?: Discipline;
    niveauId?: number;
    ageGroup: string;
    change(obj: Partial<ParticipantState>);
}

export interface ParticipantCState {
    open: boolean;
}

export class Participant extends React.Component<ParticipantProps, ParticipantCState> {
    constructor(props: ParticipantProps) {
        super(props);
        this.state = { open: false };
    }

    get courseTypeOptions() {
        return getEnumElementsAsDropdownItemProps(CourseType, ["Gruppenkurs"]);
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

    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });

    render() {
        return (<>
            <tr>
                <td>
                    <Input 
                        placeholder='Name'
                        name='name'
                        fluid
                        value={this.props.name}
                        onChange={this.handleChange} /></td>
                <td>
                    <Input 
                        placeholder='Jahrgang' 
                        name='ageGroup' 
                        fluid
                        value={this.props.ageGroup} 
                        onChange={this.handleChange} />
                </td>
                <td>
                    <Modal open={this.state.open} onOpen={this.open} onClose={this.close} dimmer={'blurring'} trigger={<Button>Long Modal</Button>}>
                        <Modal.Header>Profile Picture</Modal.Header>
                        <Modal.Content image>
                            {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/assets/images/wireframe/image.png' />
                            <Modal.Description>
                                <Header>Modal Header</Header>
                                <p>This is an example of expanded content that will cause the modal's dimmer to scroll</p>
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                                <Image src='https://react.semantic-ui.com/assets/images/wireframe/paragraph.png' />
                            </Modal.Description> */}

                            <Form className='tablet column'>
                                <Form.Field required>
                                    <label>Kurstyp</label>
                                    <Dropdown
                                        placeholder='Kurstyp'
                                        name='courseType'
                                        selection fluid
                                        options={this.courseTypeOptions}
                                        value={toDropdownValue(this.props.courseType)}
                                        selectOnBlur={false}
                                        onChange={this.handleDropdownValueChange} />
                                </Form.Field>
                                <Form.Field required>
                                    <label>Disziplin</label>
                                    <Dropdown 
                                        placeholder='Disziplin'
                                        name='discipline' 
                                        selection fluid
                                        options={this.disciplineOptions}
                                        value={toDropdownValue(this.props.discipline)}
                                        selectOnBlur={false}
                                        onChange={this.handleDropdownValueChange} />
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
                                        onChange={this.handleDropdownValueChange} />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button primary onClick={this.close}>
                                Proceed
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </td>
            </tr>
        </>);
    }
}
