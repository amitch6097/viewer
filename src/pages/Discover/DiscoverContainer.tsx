import React from 'react';
import { DiscoverView } from './DiscoverView';
import { EIdentify, IIdentify } from 'typings/types';
import { Search } from '../../lib/Search';
import { SearchResult } from '../../lib/SearchResult';
import queryString from 'query-string';

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
