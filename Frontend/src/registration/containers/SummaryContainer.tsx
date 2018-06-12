import { connect } from 'react-redux';

import { State } from '../../main/state';
import { Summary, SummaryProps } from '../components/Summary';

export const SummaryContainer = connect(
    (state: State): Partial<SummaryProps> => {
        return {
            applicant: state.registration.applicant,
            participants: state.registration.participants,
            possibleCourses: state.registration.possibleCourses
        }
    }
)(Summary)
