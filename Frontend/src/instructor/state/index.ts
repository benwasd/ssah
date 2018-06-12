import { CourseDto } from "../../api";

export interface InstructorState {
    instructorId: string | undefined;
    instructorName: string | undefined;
    courses: CourseDto[];
}
