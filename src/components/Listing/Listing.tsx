import React from 'react';
import './Listing.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as Icons from '@material-ui/icons';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';

import { IBusinessListing, IReviews } from '../../../typings/types';
import { onChangeValue } from '../../helpers';
import { strings } from '../../strings';
import { config } from '../../config';

import { OwnerBio } from '../../components/OwnerBio';
import { IdentityDisplay } from '../../components/IdentityDisplay';
import { ActionButton } from '../../components/ActionButton';
import { ListingTitleCard } from './ListingTitleCard';
import { ListingAbout } from './ListingAbout';
import { ListingOwners } from './ListingOwners';
import {
    Theme,
    createStyles,
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';
import { Hidden, List } from '@material-ui/core';
import { ListingActions } from './ListingActions';
import { ListingReviews } from './ListingReviews';
export interface IListingProps {
    business: IBusinessListing;
    reviews?: IReviews;
    isFavorited: boolean;
    onToggleFavorite: () => void;
    onLoadMoreReviews?: () => void;
    isEditable?: boolean;
    onChangeAbout?: (about: string) => void;
    onChangeOwnerBio?: (index: number) => (bio: string) => void;
    id: string;
}

const useStyles = makeStyles({
    root: {},
    content: {
    },
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
                    />
                <Hidden mdUp>
                    <ListingActions business={props.business} />
                </Hidden>
                </section>
                <Divider className={classes.divider} />

                <section id="bb-listing-about">
                    <ListingAbout business={props.business} />
                </section>
                <Divider className={classes.divider} />
                <section id="bb-listing-owners">
                    <ListingOwners business={props.business} />
                </section>
                <Divider className={classes.divider} />
                {props.reviews && (
                    <section id="bb-listing-reviews">
                        <ListingReviews
                            reviews={props.reviews}
                            onLoadMoreReviews={props.onLoadMoreReviews}
                        />
                    </section>
                )}
            </Grid>
            <Hidden smDown>
                <Grid className={classes.aside} item md={3}>
                    <aside>
                        <ListingActions business={props.business} />
                    </aside>
                </Grid>
            </Hidden>
        </Grid>
    );
}
