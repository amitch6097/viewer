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

import { IdentityDisplay } from '../../components/IdentityDisplay';
import { IBusinessListing } from '../../../typings/types';
import { onChangeValue } from '../../helpers';
import { strings } from '../../strings';
import { OwnerBio } from '../../components/OwnerBio';


export interface IListingProps {
    business: IBusinessListing;
    isEditable?: boolean;
    onChangeAbout?: (about: string) => void;
}

const useStyles = makeStyles({
    root: {},
    title: {
        fontWeight: 700,
    },
    ownersContainer: {
        marginTop: '10px',
    },
    ownerItem: {},
});

export function ListingOwners(props: IListingProps) {
    const classes = useStyles(props);

    return (
        <Grid
            className={classes.root}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.title} variant="h5" gutterBottom>
                Owners
            </Typography>
            <Grid
                className={classes.ownersContainer}
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                {props.business.owners.map((owner, index) => {
                    return (
                        <Grid
                            className={classes.ownerItem}
                            item
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <OwnerBio owner={owner} isEditable={props.isEditable} />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
}
