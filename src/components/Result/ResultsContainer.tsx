import { Slide } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
import { useSearch } from '../../hooks/useSearch';
import { FavoritesPopup } from '../../pages/FavoritesPopup/FavoritesPopup';
import { ResultActions } from './Result';
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
    actions: Partial<ResultActions>;
    onClickAction: (action: keyof ResultActions, businessId: string) => void;
}

export function ResultsContainer(props) {
    const { result } = useSearch();
    const businesses = useMemo(() => result?.getResults() ?? [], [result]);
    const [favoritePopupId, setFavoritePopupId] = React.useState(undefined);

    function handleClickAction(
        action: keyof ResultActions,
        businessId: string
    ) {
        if (action === 'favorite') {
            setFavoritePopupId(businessId);
        } else if (props.onClickAction) {
            props.onClickAction(action, businessId);
        }
    }

    return (
        <div>
            <Results
                {...props}
                businesses={businesses}
                onClickAction={handleClickAction}
                actions={{
                    favorite: false
                }}
            />
            {businesses && favoritePopupId && (
                <Slide
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
                </Slide>
            )}
        </div>
    );
}
