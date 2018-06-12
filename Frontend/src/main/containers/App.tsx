import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { applyMiddleware, createStore, Unsubscribe } from 'redux';
import thunk from 'redux-thunk';

import { AppContainer } from '../components/AppContainer';
import { AppHeader } from '../components/AppHeader';
import { BusyIndicator } from '../components/BusyIndicator';
import { reducer } from '../reducers';
import { CourseDetailContainer } from '../../instructor/containers/CourseDetailContainer';
import { CourseListContainer } from '../../instructor/containers/CourseListContainer';
import { InstructorLoginContainer } from '../../instructor/containers/InstructorLoginContainer';
import { SocketConnectedRefreshWrapper } from '../../instructor/containers/SocketConnectedRefreshWrapper';
import { RegistrationContainer } from '../../registration/containers/RegistrationContainer';

const store = createStore(reducer, applyMiddleware(thunk));

export class App extends React.Component {
    render() {
        return (<>
            <AppHeader />
            <AppContainer>
                <Provider store={store}>
                    <HashRouter>
                        <Switch>
                            <Route exact path="/register" component={RegistrationContainer} />
                            <Route path="/registration/:id" component={RegistrationContainer} />
                            <Route path="/instructor">
                                <SocketConnectedRefreshWrapper>
                                    <HashRouter basename="/instructor">
                                        <Switch>
                                            <Route path="/login" component={InstructorLoginContainer} />
                                            <Route path="/course/:id" component={CourseDetailContainer} />
                                            <Route path="/" component={CourseListContainer} />
                                        </Switch>
                                    </HashRouter>
                                </SocketConnectedRefreshWrapper>
                            </Route>
                            <Redirect path='/' to='/register' />
                        </Switch>
                    </HashRouter>
                </Provider>
                <BusyIndicator store={store} />
            </AppContainer>
        </>);
    }
}
