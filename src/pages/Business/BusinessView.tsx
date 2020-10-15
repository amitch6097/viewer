import React from 'react';
import './BusinessView.less';
import { makeStyles } from '@material-ui/core/styles';

import { FavoritesPopup } from '../FavoritesPopup/FavoritesPopup';
import { Listing } from '../../components/Listing';
import { Slide, Container } from '@material-ui/core';

const useStyles = makeStyles({
    root: {},
    container: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)'
    },
});


export function BusinessView({
    business,
    id,
    reviews,
    onLoadMoreReviews,
    isFavorited,
    onToggleFavorite,
    favoritesPopupOpen,
}) {
    const classes = useStyles();
    return (
        <Container className={classes.container}>
            <Listing
                id={id}
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
        </Container>
    );
}
