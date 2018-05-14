import { connect, Dispatch } from 'react-redux';

import { decrement, increment, applicantChange } from '../actions';
import { Counter, CounterProps } from '../components/Counter';
import { State, ApplicantState } from '../state';
import { ApplicantProps, Applicant } from '../components/Applicant';

const mapStateToProps: (state: State) => Partial<ApplicantProps> = state => {
    return state.applicant;
}

const mapDispatchToProps: (dispatch: Dispatch) => Partial<ApplicantProps> = dispatch => {
    return {
        change: applicantChange(dispatch)
    };
}

export const ApplicantContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Applicant)
