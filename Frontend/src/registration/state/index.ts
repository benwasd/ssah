import { Reducer } from "redux";

export interface State {
    counter: number;
    applicant: ApplicantState;
}

export interface ApplicantState {
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
}
