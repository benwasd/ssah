import * as React from 'react';

import { SummaryContainer } from './SummaryContainer';

export class RegistrationStep3Container extends React.Component {
    render() {
        return (<>
            <h2>Sind die folgenden Angaben richtig?</h2>
            <SummaryContainer />
        </>);
    }
}
