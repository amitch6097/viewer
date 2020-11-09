import { withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { UpdateBusinessView } from '../../src/pages/UpdateBusiness';

export default {
    title: 'Pages|UpdateBusinessView',
    component: UpdateBusinessView,
    decorators: [withKnobs],
};

export const UpdateBusinessViewStory = () => <UpdateBusinessView />;
