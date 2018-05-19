import { Reducer } from "redux";
import { Discipline, CourseType, Language } from "../../api";

export interface State {
    // id: string;
    // timestamp: string;
    applicant: ApplicantState;
    availability: AvailabilityState;
    partipiants: PartipiantState[];
}

export interface ApplicantState {
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    preferSimultaneousCourseExecutionForPartipiants: boolean;
}

export interface AvailabilityState {
    availableFrom?: Date;
    availableTo?: Date;
}

export interface PartipiantState {
    id?: string;
    timestamp?: string;
    name: string;
    courseType?: CourseType;
    discipline?: Discipline;
    niveauId?: number;
    commiting?: {
        language: Language;
        ageGroup: number;
        courseIdentifier: number;
        courseStartDate: Date;
    }
}
