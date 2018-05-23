import { CourseDto } from "../../api";

export interface InstructorState {
    instructorId: string | null;
    instructorName: string | null;
    courses: CourseDto[];
}
