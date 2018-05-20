import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './styling/semantic.less';
import 'moment/locale/de-ch';

import { App } from './containers/App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
