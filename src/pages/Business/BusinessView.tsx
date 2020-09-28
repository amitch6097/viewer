import React from 'react';
import './BusinessView.less';

import { FavoritesPopup } from '../FavoritesPopup/FavoritesPopup';
import { Listing } from '../../components/Listing';
import { Slide } from '@material-ui/core';

export function BusinessView({
    business,
    id,
    reviews,
    onLoadMoreReviews,
    isFavorited,
    onToggleFavorite,
    favoritesPopupOpen,
}) {
    return (
        <div className="bb-pages bb-pages-business">
            <Listing
                id={id}
                isEditable={false}
                business={business}
                reviews={reviews}
                onLoadMoreReviews={onLoadMoreReviews}
                isFavorited={isFavorited}
                onToggleFavorite={onToggleFavorite}
            />
            <Slide
                in={favoritesPopupOpen}
                direction="up"
                mountOnEnter
                unmountOnExit
            >
                <FavoritesPopup
                    business={business}
                    businessId={id}
                    onClose={onToggleFavorite}
                />
            </Slide>
        </div>
    );
}
