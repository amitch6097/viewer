import React from 'react';
import { Results } from './Results';
import { useSearch } from '../../hooks/useSearch';

export interface IResultsContainerProps {
    minimal?: boolean;
    imageSize?: number;
    onClick: (key: string) => void;
    spacing?: number;
    styles?: {
        root?: object;
        item?: object;
    }
}

export function ResultsContainer(props) {
    const { result } = useSearch();
    return (
        <Results
            {...props}
            businesses={result?.getResults() ?? []}
        />
    );
}
