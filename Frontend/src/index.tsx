import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './styling/semantic.less';

import reducers from './reducers'
import { App } from "./components/App";
import { State } from "./store/state";

const store = createStore(reducers, {counter:0});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
