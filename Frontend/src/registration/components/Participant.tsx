import * as React from 'react';
import { Dropdown, DropdownItemProps, Input } from 'semantic-ui-react';

import { CourseType, Discipline } from '../../api';
import { fromDropdownValue, getEnumElementsAsDropdownItemProps, toDropdownValue } from '../../utils';
import { ParticipantState } from '../state';

export interface ParticipantProps {
    name: string;
    courseType: CourseType;
    discipline: Discipline;
    niveauId?: number;
    ageGroup: string;
    change(obj: Partial<ParticipantState>);
}

export class Participant extends React.Component<ParticipantProps> {
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

    render() {
        return (<>
            <tr>
                <td><Input name='name' placeholder='Name' value={this.props.name} onChange={this.handleChange} fluid /></td>
                <td><Dropdown name='courseType' placeholder='Kurstyp' selection options={this.courseTypeOptions} value={toDropdownValue(this.props.courseType)} selectOnBlur={false} onChange={this.handleDropdownValueChange} fluid /></td>
                <td><Dropdown name='discipline' placeholder='Disziplin' selection options={this.disciplineOptions} value={toDropdownValue(this.props.discipline)} selectOnBlur={false} onChange={this.handleDropdownValueChange} fluid /></td>
                <td><Dropdown name='niveauId' placeholder='Niveau' selection options={this.niveauOptions} value={toDropdownValue(this.props.niveauId)} selectOnBlur={false} onChange={this.handleDropdownValueChange} fluid /></td>
                <td><Input name='ageGroup' placeholder='Jahrgang' value={this.props.ageGroup} onChange={this.handleChange} fluid /></td>
            </tr>
        </>);
    }
}
