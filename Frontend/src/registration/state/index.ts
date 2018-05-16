import { Reducer } from "redux";

export interface State {
    applicant: ApplicantState;
    availability: AvailabilityState;
}

export interface ApplicantState {
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
}

export interface AvailabilityState {
    availableFrom: Date;
    availableTo: Date;
}
