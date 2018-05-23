import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { InstructorLoginContainer } from '../../instructor/containers/InstructorLoginContainer';
import { CourseListContainer } from '../../instructor/containers/CourseListContainer';
import { OpenRegistrationContainer } from '../../registration/containers/OpenRegistrationContainer';
import { RegisterContainer } from '../../registration/containers/RegisterContainer';
import { reducer } from '../reducers';
import { CourseDetailContainer } from '../../instructor/containers/CourseDetailContainer';
import { SocketConnectedRefreshWrapper } from '../../instructor/containers/SocketConnectedRefreshWrapper';

const store = createStore(reducer, applyMiddleware(thunk));

export class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <Switch>
                        <Route exact path="/register" component={RegisterContainer} />
                        <Route path="/registration/:id" component={OpenRegistrationContainer} />
                        <Route path="/instructor">
                            <SocketConnectedRefreshWrapper>
                                <HashRouter basename="/instructor">
                                    <Switch>
                                        <Route path="/login" component={InstructorLoginContainer} />
                                        <Route path="/instructor/course/:id" component={CourseDetailContainer} />
                                        <Route path="/" component={CourseListContainer} />
                                    </Switch>
                                </HashRouter>
                            </SocketConnectedRefreshWrapper>
                        </Route>
                    </Switch>
                </HashRouter>
            </Provider>
        );
    }
}
