import { Reducer, Action } from 'redux';
import { State } from '../store/state';

export enum TypeKeys {
    INC = "INC",
    DEC = "DEC",
    OTHER_ACTION = "__any_other_action_type__"
}

export interface IncrementAction {
    type: TypeKeys.INC;
    by: number;
}

export interface DecrementAction {
    type: TypeKeys.DEC;
    by: number;
}

export interface OtherAction {
    type: TypeKeys.OTHER_ACTION;
}

export type ActionTypes = 
    | IncrementAction 
    | DecrementAction 
    | OtherAction;

export function counterReducer(s: State, action: ActionTypes) {
    switch (action.type) {
        case TypeKeys.INC:
            return { counter: s.counter + action.by };
        case TypeKeys.DEC:
            return { counter: s.counter - action.by };
        default:
            return s;
    }
}