import React from 'react';
import { goToBusiness } from '../../history';

import { CreateContainer } from './CreateContainer';

export interface ICreateProps {
    history: any;
}

export class Create extends React.Component<ICreateProps> {
    constructor(props) {
        super(props);
    }

    goToBusiness = (id: string) => {
        goToBusiness(this.props.history, id);
    };
    render() {
        return <CreateContainer goToBusiness={this.goToBusiness} />;
    }
}
