import React from 'react';

import { AppBar } from './AppBar';
import { useUser } from '../../hooks/useUser';
import { SearchContainer } from '../Search/SearchContainer';

export interface IAppBarContainerProps {
    history: any;
    location: any;
}

export function AppBarContainer(props: IAppBarContainerProps) {
    const user: firebase.User = useUser();
    const withoutSearch = !props.location?.pathname || props.location.pathname === '/';
    const searchComponent = withoutSearch ?  <></> : <SearchContainer />;

    return <AppBar {...props} user={user} searchComponent={searchComponent} />;
}
