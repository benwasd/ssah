import { Reducer } from "redux";
import { Discipline, CourseType, Language } from "../../api";

export interface RegistrationState {
    id?: string;
    applicant: ApplicantState;
    availability: AvailabilityState;
    partipiants: PartipiantState[];
}

export interface ApplicantState {
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    language: Language;
    preferSimultaneousCourseExecutionForPartipiants: boolean;
}

export interface AvailabilityState {
    availableFrom?: Date;
    availableTo?: Date;
}

export interface PartipiantState {
    id?: string;
    rowVersion?: string;
    name: string;
    courseType?: CourseType;
    discipline?: Discipline;
    niveauId?: number;
    ageGroup: string;
    commiting?: {
        courseIdentifier: number;
        courseStartDate: Date;
    }
}

export function hasAllRegistrationProperties(p: PartipiantState) {
    return p.name != "" && p.niveauId != null && p.courseType != null && p.discipline != null && p.ageGroup != "";
}
