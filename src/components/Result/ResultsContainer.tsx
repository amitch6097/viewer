import { Slide } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { FavoritesPopup } from '../../pages/FavoritesPopup/FavoritesPopup';
import { Results } from './Results';


export interface IResultsContainerProps {
    minimal?: boolean;
    imageSize?: number;
    onClick: (key: string) => void;
    spacing?: number;
    styles?: {
        root?: object;
        item?: object;
    };
    withFavorite: boolean;
}

export function ResultsContainer(props) {
    const { result } = useSearch();
    const businesses = useMemo(() => result?.getResults() ?? [], [result]);

    const [favoritePopupId, setFavoritePopupId] = React.useState(undefined);
    return (
        <div>
            <Results {...props} businesses={businesses} onClickFavorite={setFavoritePopupId} />
            {businesses && favoritePopupId && (<Slide
                in={Boolean(favoritePopupId)}
                direction="up"
                mountOnEnter
                unmountOnExit
            >
                <FavoritesPopup
                    business={businesses[favoritePopupId]}
                    businessId={favoritePopupId}
                    onClose={() => setFavoritePopupId(undefined)}
                />
            </Slide>)}
        </div>
    );
}
