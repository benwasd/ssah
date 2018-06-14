import * as React from 'react';

import * as logoPng from './../../assets/logo.png';

export class AppHeader extends React.Component {
    render() {
        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a href="#" className="header item">
                        <img className="logo" src={logoPng} />
                    </a>
                </div>
            </div>
        );
    }
}
