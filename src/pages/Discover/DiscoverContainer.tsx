import React from 'react';
import { DiscoverView } from './DiscoverView';

export interface IDiscoverContainerProps {
    goToBusiness: (id: string) => void;
    onUpdateSearchURL: (url: string) => void;
}
export class DiscoverContainer extends React.Component<
    IDiscoverContainerProps,
    any
> {
    render() {
        return (
            <DiscoverView
                onClickBusiness={this.props.goToBusiness}
            />
        );
    }
}
