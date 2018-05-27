import * as React from 'react';
import { Store, Unsubscribe } from 'redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { State } from '../state';

export interface BusyIndicatorProps {
    store: Store<State>;
}

export interface BusyIndicatorState {
    isBusy: boolean;
    isVisible: boolean;
}

export class BusyIndicator extends React.Component<BusyIndicatorProps, BusyIndicatorState> {
    private isBusyUnsubscribe: Unsubscribe;

    constructor(props: BusyIndicatorProps) {
        super(props);
        this.state = { isBusy: false, isVisible: false }; 
    }

    componentWillMount() {
        this.isBusyUnsubscribe = this.props.store.subscribe(() => {
            const isBusy = this.props.store.getState().requests > 0;
            const isBusyLocal = this.state.isBusy;

            if (isBusyLocal !== isBusy) {
                if (isBusyLocal && !isBusy) {
                    this.setState({ isBusy: false });
                    setTimeout(() => this.setState({ isVisible: false }), 500);
                }
                else if (!isBusyLocal && isBusy) {
                    this.setState({ isBusy: true, isVisible: true });
                }
            }
        });
    }

    componentWillUnmount() {
        this.isBusyUnsubscribe();
    }

    render() {
        return (
            <Dimmer active={this.state.isVisible}>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
        );
    }
}
