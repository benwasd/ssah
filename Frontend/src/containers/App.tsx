import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import { AvailabilitySelector } from '../registration/components/AvailabilitySelector';
import { RegistrationContainer, OpenRegistrationContainer } from '../registration/containers/RegistrationContainer';
import { reducer as registrationReducer } from '../registration/reducers';

const registrationStore = createStore(registrationReducer);

export class App extends React.Component {
    render() {
        return (
            <Provider store={registrationStore}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/register" component={RegistrationContainer} />
                        <Route path="/registration/:id" component={OpenRegistrationContainer} />
                        <Route path="/login" />
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}
