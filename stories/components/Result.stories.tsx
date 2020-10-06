import React from 'react';
import { BUSINESS_DATA } from '../../__mock__/business-data';
import { Result, Results, ResultSkeleton, ResultsSkeleton } from '../../src/components/Result';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Result',
    component: Result,
    decorators: [withKnobs],
};

export const ResultStory = () => (
    <Result
        imageSize={number('imageSize', 200)}
        onClick={console.log}
        minimal={boolean('minimal', false)}
        business={BUSINESS_DATA}
    />
);

export const ResultSkeletonStory = () => {
    return (
        <ResultSkeleton />
    )
}

export const ResultsStory = () => {
    const businesses = new Array(10)
        .fill(undefined)
        .map(() => BUSINESS_DATA)
        .reduce((_, business, index) => {
            _[index] = business;
            return _;
        }, {});
    return (
        <Results
            imageSize={number('imageSize', 200)}
            onClick={console.log}
            minimal={boolean('minimal', false)}
            businesses={businesses}
            spacing={number('spacing', 2)}
        />
    );
};

export const ResultsSkeletonStory = () => {
    return (
        <ResultsSkeleton />
    )
}
