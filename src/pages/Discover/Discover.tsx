import React from 'react';
import { DiscoverContainer } from './DiscoverContainer';
import { goToBusiness } from '../../history';

export interface IDiscoverProps {
    history: any;
}

export class Discover extends React.Component<IDiscoverProps> {
    constructor(props) {
        super(props);
    }

    goToBusiness = (id: string) => {
        goToBusiness(this.props.history, id);
    };

    onUpdateSearchURL = (url: string) => {
        this.props.history.push({
            pathname: '/discover',
            search: url
          });
    }

    render() {
        return <DiscoverContainer onUpdateSearchURL={this.onUpdateSearchURL} goToBusiness={this.goToBusiness}/>;
    }
}
