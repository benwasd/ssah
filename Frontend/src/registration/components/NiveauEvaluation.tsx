import * as React from 'react';

import { NiveauQuestion, NiveauResponse } from '../../resources';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { toDropdownValue, fromDropdownValue, throwIfUndefined } from '../../utils';

export interface NiveauEvaluationProps {
    question: NiveauQuestion;
    niveauEvaluated: (niveauId?: number) => void;
}

export interface NiveauEvaluationState {
    selectedResponse?: NiveauResponse;
    selectedResponseIndex?: number;
}

export class NiveauEvaluation extends React.Component<NiveauEvaluationProps, NiveauEvaluationState> {
    constructor(props: NiveauEvaluationProps) {
        super(props);
        this.state = { selectedResponse: undefined, selectedResponseIndex: undefined };
    }

    componentWillReceiveProps(nextProps: NiveauEvaluationProps) {
        if (this.props.question !== nextProps.question) {
            this.setState({ selectedResponse: undefined, selectedResponseIndex: undefined });
        }
    }

    get responseOptions() {
        return this.props.question.responses.map((r, i) => ({ text: r.response, value: toDropdownValue(i) }) as DropdownItemProps)
    }

    handleDropdownValueChange = (event: React.ChangeEvent<HTMLInputElement>, { name, value }) => {
        this.setState(
            { 
                selectedResponse: this.props.question.responses[fromDropdownValue(parseInt(value))],
                selectedResponseIndex: fromDropdownValue(parseInt(value))
            },
            () => {
                if (this.selectedResponseDefinesNiveau()) {
                    this.props.niveauEvaluated(throwIfUndefined(throwIfUndefined(this.state.selectedResponse).niveau));
                }
                else {
                    this.props.niveauEvaluated(undefined);
                }
            }
        );
    }

    render() {
        return (<>
            <div className='mt-3'>{this.props.question.question}</div>
            <div>
                <Dropdown 
                    selection fluid
                    options={this.responseOptions}
                    selectOnBlur={false}
                    value={toDropdownValue(this.state.selectedResponseIndex)}
                    onChange={this.handleDropdownValueChange} />
            </div>
            {this.selectedResponseDefinesFollowingQuestion() &&
                <NiveauEvaluation
                    question={throwIfUndefined(throwIfUndefined(this.state.selectedResponse).followingQuestion)}
                    niveauEvaluated={this.props.niveauEvaluated} />}
        </>);
    }

    private selectedResponseDefinesNiveau() {
        return !!this.state.selectedResponse && !!this.state.selectedResponse.niveau;
    }

    private selectedResponseDefinesFollowingQuestion() {
        return !!this.state.selectedResponse && !!this.state.selectedResponse.followingQuestion;
    }
}
