import Grid from '@material-ui/core/Grid';
import {
    makeStyles
} from '@material-ui/core/styles';
import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { ListingTitleCard } from './ListingTitleCard';

export interface IListingHeadingProps {
    business: IBusinessListing;
    isEditable?: boolean;
    id: string;
    isFavorited: boolean;
    onChangeAbout?: (about: string) => void;
    onToggleFavorite: () => void;
}

const useStyles = makeStyles({
    root: {},
});

export function ListingHeading(props: IListingHeadingProps) {
    const classes = useStyles(props);

    return (
        <Grid
            className={classes.root}
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <ListingTitleCard {...props} />
        </Grid>
    );
}
