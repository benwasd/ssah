import * as React from "react"

export interface CounterProps {
    increment: (count: number) => void,
    decrement: (count: number) => void,
    counter: number
}

export class Counter extends React.Component<CounterProps> {
    render() {
        return (
            <div>
                <span>{this.props.counter}</span>
                <button onClick={() => this.props.increment(1)}>+</button>
                <button onClick={() => this.props.decrement(1)}>-</button>
            </div>
        );
    }
}
