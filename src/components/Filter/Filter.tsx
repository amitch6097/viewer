import React from 'react';

import { FilterCategory } from './FilterCategory';

export function Filter() {
    const data = new Array(5).fill(undefined);
    return (
        <div className="bb-filter">
            Filter
            {data.map(() => {
                return <FilterCategory />;
            })}
        </div>
    );
}
