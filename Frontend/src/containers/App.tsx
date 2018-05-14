import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import { AvailabilitySelector } from '../registration/components/AvailabilitySelector';
import { ApplicantContainer } from '../registration/containers/ApplicantContainer';
import { CounterContainer } from '../registration/containers/CounterContainer';
import { reducer as registrationReducer } from '../registration/reducers';

const registrationStore = createStore(registrationReducer);

export class App extends React.Component {
    render() {
        return (
            <Provider store={registrationStore}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={ApplicantContainer} />
                        <Route path="/w" component={AvailabilitySelector} />
                        <Route path="/login" component={CounterContainer} />
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}
