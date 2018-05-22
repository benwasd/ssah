import { Reducer } from "redux";
import { Discipline, CourseType, Language, RegistrationStatus, PossibleCourseDto } from "../../api";

export interface RegistrationState {
    id: string | null;
    status: RegistrationStatus;
    applicant: ApplicantState;
    availability: AvailabilityState;
    participants: ParticipantState[];
    possibleCourses: PossibleCourseDto[];
}

export interface ApplicantState {
    id?: string;
    surname: string;
    givenname: string;
    residence: string;
    phoneNumber: string;
    language?: Language;
    preferSimultaneousCourseExecutionForParticipants: boolean;
}

export interface AvailabilityState {
    availableFrom?: Date;
    availableTo?: Date;
}

export interface ParticipantState {
    id?: string;
    rowVersion?: string;
    name: string;
    courseType?: CourseType;
    discipline?: Discipline;
    niveauId?: number;
    ageGroup: string;
    committing?: {
        courseIdentifier: number;
        courseStartDate: Date;
    }
}

export function hasAllRegistrationProperties(p: ParticipantState) {
    return p.name != "" && p.niveauId != null && p.courseType != null && p.discipline != null && p.ageGroup != "";
}
