import * as React from 'react';

export class AppContainer extends React.Component {
    render() {
        return (
            <div className="ui main container">
                {this.props.children}
            </div>
        );
    }
}
