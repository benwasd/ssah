import * as React from 'react';
import { Card } from 'semantic-ui-react';

export interface HowItWorksCardProps {
}

export class HowItWorksCard extends React.Component<HowItWorksCardProps> {
    render() {
        return (
            <Card fluid>
                <Card.Content header='So funktionierts' />
                <Card.Content>
                <ol className="ui list">
                    <li>Registrieren Sie sich.</li>
                    <li>Wählen sie den passenden Kurs.
                        Können wir Heute noch nichts für Sie anbieten, keine Angst:
                        Sie werden per SMS auf dem laufenden gehalten.
                    </li>
                    <li>Bestätigen Sie die Anmeldung.</li>
                    <li>Geniessen Sie einen tollen Tag im Schnee.</li>
                </ol>
                </Card.Content>
            </Card>
        );
    }
}
