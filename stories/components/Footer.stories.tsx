import React from 'react';
import {
    Footer
} from '../../src/components/Footer';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Footer',
    component: Footer,
    decorators: [withKnobs],
};

export const FooterStory = () => <Footer />;
