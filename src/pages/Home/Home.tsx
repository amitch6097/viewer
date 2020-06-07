import React from 'react';
import './Home.less';

import { AppBar } from '../../components/AppBar';
import { ListItem } from '../../components/ListItem';
import { Filter } from '../../components/Filter';

export function Home() {
    const data = new Array(5).fill(undefined);
    return (
        <div className="bb-pages bb-pages-home">
            <AppBar />
            <div className="bb-pages-home__content">
                <Filter />
                {data.map(() => {
                    return <ListItem />;
                })}
            </div>
        </div>
    );
}
