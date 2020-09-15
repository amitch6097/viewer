import React from 'react';
import { AppBar } from '../../src/components/AppBar/AppBar';
import { Filters } from '../../src/components/Filters';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Filters',
    component: Filters,
    decorators: [withKnobs],
};

export const FiltersStory = () => (
    <Filters
        filters={{ FEMALE: false, MINORITY: false }}
        category={undefined}
        locationDistance={100}
        onChangeFilterSelected={console.log}
        onChangeLocationDistance={console.log}
        onChangeCategory={console.log}
    />
);
