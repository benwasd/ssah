import { connect, Dispatch } from 'react-redux';

import { decrement, increment } from '../actions';
import { Counter, CounterProps } from '../components/Counter';
import { State } from '../reducers';

const mapStateToProps: (state: State) => Partial<CounterProps> = state => {
    return { 
        counter: state.counter 
    };
}

const mapDispatchToProps: (dispatch: Dispatch) => Partial<CounterProps> = dispatch => {
    return {
        increment: increment(dispatch),
        decrement: decrement(dispatch)
    };
}

export const CounterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)
