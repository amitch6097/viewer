import React from 'react';
import {
    Pagination
} from '../../src/components/Pagination';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Pagination',
    component: Pagination,
    decorators: [withKnobs],
};

export const PaginationStory = () => <Pagination pages={3} page={1} onChangePage={console.log}/>;
