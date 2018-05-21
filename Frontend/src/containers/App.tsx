import * as React from 'react';
import thunk from 'redux-thunk';
import * as signalR from '@aspnet/signalr';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { RegisterContainer } from '../registration/containers/RegisterContainer';
import { OpenRegistrationContainer } from '../registration/containers/OpenRegistrationContainer';
import { reducer } from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk));

let connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:51474/ping")
    .build();
 
connection.on("Notify", data => {
    console.log(data);
});
 
connection.start();

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/register" component={RegisterContainer} />
                        <Route path="/registration/:id" component={OpenRegistrationContainer} />
                        <Route path="/login" />
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}
