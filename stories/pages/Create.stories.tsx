import React from 'react';
import { withKnobs, text, boolean, number, knob } from '@storybook/addon-knobs';
import {CreateView, Create} from '../../src/pages/Create';
import {DetailsStep} from '../../src/pages/Create/Steps/DetailsStep';
import { BUSINESS_DATA } from '../../__mock__/business-data';

export default {
    title: 'Pages|Create',
    component: Create,
    decorators: [withKnobs],
};


export const DetailsStepStory = () => (
    <DetailsStep 
        business={BUSINESS_DATA}
        creating={boolean('creating', false)}
        onChangeOwnerBio={() => console.log}
        onChangeAbout={console.log}
        onNextStep={console.log}
    />
);