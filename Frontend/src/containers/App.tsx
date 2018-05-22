import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { InstructorCourseListContainer } from '../instructor/containers/InstructorCourseListContainer';
import { OpenRegistrationContainer } from '../registration/containers/OpenRegistrationContainer';
import { RegisterContainer } from '../registration/containers/RegisterContainer';
import { reducer } from '../reducers';

const store = createStore(reducer, applyMiddleware(thunk));

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/register" component={RegisterContainer} />
                        <Route path="/registration/:id" component={OpenRegistrationContainer} />
                        <Route path="/instructor" component={InstructorCourseListContainer} />
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}
