import React from 'react';
import './Listing.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ListingTitleCard } from './ListingTitleCard';
import {
    Theme,
    createStyles,
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';

import { IBusinessListing } from '../../../typings/types';


export interface IListingProps {
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

export function Listing(props: IListingProps) {
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
