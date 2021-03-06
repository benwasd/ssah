import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './assets';
import './styling/semantic.less';
import './styling/ssah.less';
import './styling/bootstrap-utils.less';

import 'moment/locale/de-ch';

import { App } from './main/containers/App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
