import * as React from 'react';

export class AppHeader extends React.Component {
    render() {
        return (
            <div className="ui fixed inverted menu">
                <div className="ui container">
                    <a href="#" className="header item">
                        <img className="logo" src="https://semantic-ui.com/examples/assets/images/logo.png" />
                        SSAH
                    </a>
                    <a href="#/register" className="item">Register</a>
                    <a href="#/instructor/login" className="item">Instructor Login</a>
                    <a href="#/instructor" className="item">Instructor</a>
                </div>
            </div>
        );
    }
}
