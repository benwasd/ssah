import { CourseType, Discipline, Language, Period, PossibleCourseDto, RegistrationStatus } from '../../api';

export interface RegistrationState {
    id: string | null;
    status: RegistrationStatus;
    showAllValidationErrors: boolean;
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
    };
    committedCoursePeriods?: Period[];
}

export function hasAllForRegistration(r: RegistrationState) {
    return !!r.applicant.surname
        && !!r.applicant.givenname
        && !!r.applicant.residence
        && !!r.applicant.phoneNumber
        && r.applicant.language != null
        && !!r.availability.availableFrom
        && !!r.availability.availableTo
        && r.participants.length > 0;
}

export function hasAllForRegistrationParticipant(p: ParticipantState) {
    return !!p.name
        && p.niveauId != null
        && p.courseType != null
        && p.discipline != null
        && !!p.ageGroup
        && parseInt(p.ageGroup) > 1900
        && parseInt(p.ageGroup) < new Date().getFullYear()
}

export function hasCourseSelectionForAllParticipants(r: RegistrationState) {
    return r.participants.every(p => !!p.committing && !!p.committing.courseIdentifier && !!p.committing.courseStartDate);
}
