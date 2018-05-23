import * as React from 'react';
import { Button, Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';

export interface InstructorLoginProps {
    login(instructorId: string, instructorName: string);
}

export class InstructorLogin extends React.Component<InstructorLoginProps> {
    dropdownElement: React.Component<DropdownProps, React.ComponentState, any> | null = null;
    options: DropdownItemProps[] = [
        {
            text: 'Martina Sägesser',
            value: 'AEEF01D4-14DE-49D1-980A-004AF5135C30'
        },
        {
            text: 'Joel Müller',
            value: 'AEEF01D4-14DE-49D1-980A-004AF5135C31'
        },
        {
            text: 'Simon Peter',
            value: 'AEEF01D4-14DE-49D1-980A-004AF5135C32'
        }
    ]

    onLogin = () => {
        if (this.dropdownElement){
            var el = this.dropdownElement as any;
            this.props.login(el.getSelectedItem().value, el.getSelectedItem().text);
        }
    }

    render() {
        return (<>
            <Dropdown ref={e => this.dropdownElement = e} placeholder='Wähle dich aus.' fluid selection options={this.options} selectOnBlur={false} />
            <Button onClick={this.onLogin}>Login</Button>
        </>);
    }
}
