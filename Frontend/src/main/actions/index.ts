import { Action, Dispatch } from "redux";

export const REQUEST_STARTED = 'REQUEST_STARTED';

export interface RequestStartedAction extends Action {
}

export const startRequest = () => (dispatch: Dispatch) => {
    const action: RequestStartedAction = { type: REQUEST_STARTED };
    dispatch(action);
}

export const REQUEST_ENDED = 'REQUEST_ENDED';

export interface RequestEndedAction extends Action {
    error?: Error
}

export const endRequest = (error?: Error) => (dispatch: Dispatch) => {
    const action: RequestEndedAction = { type: REQUEST_ENDED, error };
    dispatch(action);
}

export const track = <T>(promise: Promise<T>, dispatch: Dispatch): Promise<T> => {
    startRequest()(dispatch);
    return promise
        .catch(e => { endRequest(e)(dispatch); return Promise.reject<T>(e); })
        .then(v => { endRequest()(dispatch); return v; });
}
