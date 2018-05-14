import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';

import { CounterContainer } from '../registration/containers/CounterContainer';
import { reducer as registrationReducer } from '../registration/reducers';
import { EmptyPage } from './../components/EmptyPage';

const registrationStore = createStore(registrationReducer);

export class App extends React.Component {
    render() {
        return (
            <Provider store={registrationStore}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/" component={CounterContainer} />
                        <Route path="/login" component={EmptyPage} />
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}
