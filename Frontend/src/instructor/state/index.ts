import { CourseDto } from "../../api";

export interface InstructorState {
    instructorId: string | null;
    name: string | null;
    courses: CourseDto[];
}
