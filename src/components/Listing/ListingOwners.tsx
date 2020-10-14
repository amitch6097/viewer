import Grid from '@material-ui/core/Grid';
import {
    makeStyles
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { OwnerBio } from '../../components/OwnerBio';

export interface IListingOwnersProps {
    business: IBusinessListing;
    isEditMode?: boolean;
    onChangeAbout?: (index: number) => (about: string) => void;
}

const useStyles = makeStyles({
    root: {},
    title: {
        fontWeight: 700,
    },
    ownersContainer: {
        marginTop: '10px',
    },
    ownerItem: {
        width: '100%'
    },
});

export function ListingOwners(props: IListingOwnersProps) {
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
                            <OwnerBio
                                owner={owner}
                                isEditMode={props.isEditMode}
                                onChangeAbout={
                                    props.onChangeAbout &&
                                    props.onChangeAbout(index)
                                }
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Grid>
    );
}
