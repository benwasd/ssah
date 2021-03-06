import { connect } from 'react-redux';

import { State } from '../../main/state';
import { loginInstructor } from '../actions';
import { InstructorLogin, InstructorLoginProps } from '../components/InstructorLogin';

export const InstructorLoginContainer = connect(
    (state: State): Partial<InstructorLoginProps> => {
        return {  }
    },
    {
        login: loginInstructor
    }
)(InstructorLogin)
