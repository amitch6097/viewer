import { Hidden } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IBusinessListing, IReviews } from '../../../typings/types';
import './Listing.less';
import { ListingAbout } from './ListingAbout';
import { ListingActions } from './ListingActions';
import { ListingOwners } from './ListingOwners';
import { ListingReviews } from './ListingReviews';
import { ListingTitleCard } from './ListingTitleCard';

export interface IListingProps {
    business: IBusinessListing;
    reviews?: IReviews;
    isFavorited: boolean;
    onToggleFavorite: () => void;
    onLoadMoreReviews?: () => void;
    isEditMode?: boolean;
    onChangeAbout?: (about: string) => void;
    onChangeOwnerBio?: (index: number) => (bio: string) => void;
    id: string;
}

const useStyles = makeStyles({
    root: {},
    content: {},
    aside: {
        position: 'sticky',
        top: 0,
    },
    divider: {
        marginTop: 20,
        marginBottom: 20,
    },
});

export function Listing(props: IListingProps) {
    const classes = useStyles(props);
    const showReviews = props.reviews && !props.isEditMode;

    function _ListingActions() {
        return (
            <ListingActions
                business={props.business}
                isEditMode={props.isEditMode}
            />
        );
    }

    return (
        <Grid
            className={classes.root}
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={3}
        >
            <Grid
                className={classes.content}
                item
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                xs={12}
                md={9}
            >
                <section id="bb-listing-header">
                    <ListingTitleCard
                        id={props.id}
                        business={props.business}
                        isFavorited={props.isFavorited}
                        onToggleFavorite={props.onToggleFavorite}
                        isEditMode={props.isEditMode}
                    />
                    <Hidden mdUp>
                        <_ListingActions />
                    </Hidden>
                </section>
                <Divider className={classes.divider} />
                <section id="bb-listing-about">
                    <ListingAbout
                        business={props.business}
                        isEditMode={props.isEditMode}
                        onChangeAbout={props.onChangeAbout}
                    />
                </section>
                <Divider className={classes.divider} />
                <section id="bb-listing-owners">
                    <ListingOwners
                        business={props.business}
                        isEditMode={props.isEditMode}
                        onChangeAbout={props.onChangeOwnerBio}
                    />
                </section>
                <Divider className={classes.divider} />
                {(showReviews && props.reviews.size) ? (
                    <section id="bb-listing-reviews">
                        <ListingReviews
                            reviews={props.reviews}
                            onLoadMoreReviews={props.onLoadMoreReviews}
                        />
                    </section>
                ) : (<></>)}
            </Grid>
            <Hidden smDown>
                <Grid className={classes.aside} item md={3}>
                    <aside>
                        <_ListingActions />
                    </aside>
                </Grid>
            </Hidden>
        </Grid>
    );
}
