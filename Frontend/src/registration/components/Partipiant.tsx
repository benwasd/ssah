import * as React from 'react';
import { Form, Input, Dropdown, DropdownItemProps } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../components/DateRangePicker';
import { getEnumElementsAsDropdownItemProps } from '../../utils';
import { Discipline, CourseType } from '../../api';

export interface PartipiantProps {
    name: string;
    courseType: CourseType;
    discipline: Discipline;
    niveauId: number;
    change(obj: Partial<PartipiantState>);
}

export interface PartipiantState {

}

export class Partipiant extends React.Component<PartipiantProps, PartipiantState> {
    get courseTypeOptions() {
        return getEnumElementsAsDropdownItemProps(CourseType, ["Gruppenkurs"]);
    }

    get disciplineOptions() {
        return getEnumElementsAsDropdownItemProps(Discipline);
    }

    get niveauOptions(): DropdownItemProps[] {
        return [
            { text: "Kids Village", value: 100 },
            { text: "Blue Prince/Princess", value: 110 },
            { text: "Blue King/Queen", value: 111 },
            { text: "Blue Star", value: 112 },
        ];
    }
    
    handleChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.props.change({ [name]: value });
    }

    handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.props.change({ [name]: parseInt(value) });
    }

    render() {
        return (<>
            <tr>
                <td><Input name='name' placeholder='Name' onChange={this.handleChange} fluid /></td>
                <td><Dropdown name='courseType' placeholder='Kurstyp' selection basic options={this.courseTypeOptions} onChange={this.handleNumberChange} fluid /></td>
                <td><Dropdown name='discipline' placeholder='Disziplin' selection basic options={this.disciplineOptions} onChange={this.handleNumberChange} fluid /></td>
                <td><Dropdown name='niveauId' placeholder='Niveau' selection basic options={this.niveauOptions} onChange={this.handleNumberChange} fluid /></td>
            </tr>
        </>);
    }
}
