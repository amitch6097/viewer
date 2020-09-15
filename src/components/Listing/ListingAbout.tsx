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
    identityContainer: {
        marginTop: '10px'
    },
    identityItem: {},
});

export function ListingAbout(props: IListingProps) {
    const classes = useStyles(props);

    return (
        <Grid
            className={classes.root}
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.title} variant="h5" gutterBottom>
                About
            </Typography>
            {props.isEditable ? (
                <TextareaAutosize
                    style={{ width: '100%' }}
                    aria-label="about the business"
                    rowsMin={3}
                    onChange={onChangeValue(props.onChangeAbout)}
                    value={props.business.about}
                />
            ) : (
                <Typography variant="body1">{props.business.about}</Typography>
            )}
            <Grid
                className={classes.identityContainer}
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={3}
            >
                {Object.keys(props.business.identify)
                    .filter((key) => props.business.identify[key].selected)
                    .map((key) => {
                        const identity = props.business.identify[key];
                        return (
                            <Grid
                                className={classes.identityItem}
                                item
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <IdentityDisplay
                                    src={identity.image}
                                    label={strings.create.identify[key].label}
                                    text={identity.text}
                                />
                            </Grid>
                        );
                    })}
            </Grid>
        </Grid>
    );
}
