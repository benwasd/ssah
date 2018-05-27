import * as React from 'react';
import { Card, Icon } from 'semantic-ui-react';

export interface ApplicantCardProps {
}

export class ApplicantCard extends React.Component<ApplicantCardProps> {
    render() {
        const description = [
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ].join(' ');

        return (
            <Card fluid>
                <Card.Content header='Title' />
                <Card.Content description={description} />
                <Card.Content extra>
                    <Icon name='user' />
                    Footer
                </Card.Content>
            </Card>
        );
    }
}
