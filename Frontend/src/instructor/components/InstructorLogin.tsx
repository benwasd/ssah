import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Dropdown, DropdownItemProps, DropdownProps } from 'semantic-ui-react';

export interface InstructorLoginProps extends RouteComponentProps<{}>  {
    login(instructorId: string, instructorName: string);
}

export class InstructorLogin extends React.Component<InstructorLoginProps> {
    dropdownElement: React.Component<DropdownProps, React.ComponentState, any> | null = null;
    options: DropdownItemProps[] = [
        { text: 'Martina Sägesser', value: 'AEEF01D4-14DE-49D1-980A-004AF5135C30' },
        { text: 'Joel Müller', value: 'AEEF01D4-14DE-49D1-980A-004AF5135C31' },
        { text: 'Simon Peter', value: 'AEEF01D4-14DE-49D1-980A-004AF5135C32' },
        { text: 'Andrina Kunz', value: 'AEEF01D4-14DE-49D1-980A-004AF5135C33' },
        { text: 'Benjamin Mayr', value: 'AEEF01D4-14DE-49D1-980A-004AF5135C34' },
        { text: 'Silvia Aebersold', value: 'AEEF01D4-14DE-49D1-980A-004AF5135C35' }
    ];

    onLogin = () => {
        if (this.dropdownElement){
            var dropdownElement = this.dropdownElement as any;
            var selectedItem = dropdownElement.getSelectedItem() as DropdownItemProps
            this.props.login(selectedItem.value as string, selectedItem.text as string);
        }

        this.props.history.push('/');
    }

    render() {
        return (<>
            <div className='w-50 mb-2'>
                <Dropdown
                    ref={e => this.dropdownElement = e}
                    placeholder='Wähle dich aus.'
                    fluid selection
                    options={this.options}
                    selectOnBlur={false} />
            </div>
            <div>
                <Button onClick={this.onLogin}>Login</Button>
            </div>
        </>);
    }
}
