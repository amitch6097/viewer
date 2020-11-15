import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Home } from '../../src/pages/Home/Home';
import { MyBusinessesView } from '../../src/pages/MyBusinesses';
import { BUSINESSES_DATA } from '../../__mock__/businesses-data';

export default {
    title: 'Pages|MyBusinesses',
    component: MyBusinessesView,
    decorators: [withKnobs],
};

export const MyBusinessesViewStory = () => (
    <MyBusinessesView
        onClickBusiness={console.log}
        businesses={BUSINESSES_DATA}
    />
);
