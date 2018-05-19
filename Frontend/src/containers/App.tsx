import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import { RegistrationContainer } from '../registration/containers/RegistrationContainer';
import { OpenRegistrationContainer } from '../registration/containers/OpenRegistrationContainer';
import { reducer } from '../reducers';

const store = createStore(reducer);

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
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
