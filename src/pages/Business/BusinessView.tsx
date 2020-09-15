import React from 'react';
import './BusinessView.less';

import { Listing } from '../../components/Listing';

export function BusinessView({
    business,
    id,
    reviews,
    onLoadMoreReviews,
    isFavorited,
    onToggleFavorite,
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
        </div>
    );
}
