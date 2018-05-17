import * as React from 'react';
import { Form, Input, Dropdown, DropdownItemProps } from 'semantic-ui-react';

import { ApplicantState, AvailabilityState } from '../state';
import { DateRangePicker, DateRangePickerPropsDateChange} from '../../components/DateRangePicker';
import { getEnumElementsAsDropdownItemProps } from '../../utils';
import { Discipline, CourseType } from '../../api';

export interface PartipiantProps {
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

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
    
        console.log(name, value);
    }

    
    handleDropDownChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        console.log(name, value);
    }

    render() {
        return (<>
            <div className="row">
                <div className="four wide column">
                    <Input name='name' placeholder='Name' onChange={this.handleInputChange} />
                </div>
                <div className="four wide column">
                    <Dropdown name='courseType' placeholder='Kurstyp' selection basic options={this.courseTypeOptions} onChange={this.handleDropDownChange} />
                </div>
                <div className="four wide column">
                    <Dropdown name='discipline' placeholder='Disziplin' selection basic options={this.disciplineOptions} onChange={this.handleDropDownChange} />
                </div>
                <div className="four wide column">
                    <Dropdown name='niveauId' placeholder='Niveau' selection basic options={this.niveauOptions} onChange={this.handleDropDownChange} />
                </div>
            </div>
            <div className="row">
                <div className="three wide column">
                    <img/>
                </div>
                <div className="ten wide column">
                    <p></p>
                </div>
                <div className="three wide column">
                    <img/>
                </div>
            </div>
        </>);
    }
}
