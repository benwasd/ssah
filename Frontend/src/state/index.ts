import { RegistrationState } from "../registration/state";
import { InstructorState } from "../instructor/state";

export interface State {
    instructor: InstructorState;
    registration: RegistrationState;
}
