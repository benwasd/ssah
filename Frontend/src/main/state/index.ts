import { InstructorState } from "../../instructor/state";
import { RegistrationState } from "../../registration/state";

export interface State {
    instructor: InstructorState;
    registration: RegistrationState;
    requests: number;
}
