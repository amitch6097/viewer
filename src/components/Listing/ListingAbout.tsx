import Grid from '@material-ui/core/Grid';
import {
    makeStyles
} from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { IdentityDisplay } from '../../components/IdentityDisplay';
import { onChangeValue } from '../../helpers';
import { strings } from '../../strings';

export interface IListingAboutProps {
    business: IBusinessListing;
    isEditMode?: boolean;
    onChangeAbout?: (about: string) => void;
    onChangeIdentityText?: (text: string) => void;
}

const useStyles = makeStyles({
    root: {
        '& textarea': {
            resize: 'none'
        }
    },
    title: {
        fontWeight: 700,
    },
    identityContainer: {
        marginTop: '10px',
    },
    identityItem: {},
});

export function ListingAbout(props: IListingAboutProps) {
    const classes = useStyles(props);

    function About() {
        return props.isEditMode ? (
            <TextareaAutosize
                style={{ width: '100%' }}
                aria-label="about the business"
                placeholder='About the Business'
                rowsMin={3}
                onChange={onChangeValue(props.onChangeAbout)}
                value={props.business.about}
            />
        ) : props.business.about ? (
            <Typography variant="body1">{props.business.about}</Typography>
        ) : (<></>);
    }

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
            <About />
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
