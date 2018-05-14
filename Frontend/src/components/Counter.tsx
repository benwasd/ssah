import React = require("react");
import { connect } from 'react-redux'
import { IncrementAction, TypeKeys } from "../reducers/test";
import { State } from "../store/state";

export class Counter extends React.Component<{ increment: Function, decrement: Function, counter: number }, {}> {
    render() {
        return (
            <div>
                <span>{this.props.counter}</span>
                <button onClick={() => this.props.increment()} value='+' />
                <button onClick={() => this.props.decrement()} value='-' />
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    counter: state.counter
})

const mapDispatchToProps = dispatch => ({
    increment: () => dispatch({ type: TypeKeys.INC, by: 1 }),
    decrement: () => dispatch({ type: TypeKeys.DEC, by: 1 })
})
  
export const CounterConntected = connect(
    mapStateToProps,
    mapDispatchToProps
)(Counter)