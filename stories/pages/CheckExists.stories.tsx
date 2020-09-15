import React from 'react';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import {CheckExists} from '../../src/pages/CheckExists';


export default {
    title: 'Pages|CheckExists',
    component: CheckExists,
    decorators: [withKnobs],
};


export const CheckExistsStory = () => (
    <CheckExists />
);