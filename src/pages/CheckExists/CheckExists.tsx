import React from 'react';
import { CheckExistsContainer } from './CheckExistsContainer';

export interface ICheckExistsProps {
    onClickResult: (id: string) => void;
    onClickContinue: (args: {name: string, webBusiness: boolean}) => void;
}
export class CheckExists extends React.Component<ICheckExistsProps> {
    render() {
        return (
            <CheckExistsContainer
                onClickResult={this.props.onClickResult}
                onClickContinue={this.props.onClickContinue}
            />
        );
    }
}
