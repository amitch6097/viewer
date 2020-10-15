import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { IBusinessListing } from '../../../../typings/types';
import { Listing } from '../../../components/Listing';
import { strings } from '../../../strings';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Overlay } from '../../../components/Overlay';

export interface IDetailsStepProps {
    business: IBusinessListing;
    creating: boolean;
    onChangeAbout: (about: string) => void;
    onChangeOwnerBio: (index: number) => (bio: string) => void;
    onNextStep: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight:
            'calc(var(--page-height) - var(--page-padding) - var(--page-padding))',
    },
    content: {
        flex: 1,
    },
    progress: {
        color: theme.palette.primary.contrastText,
    },
    continue: {
        alignSelf: 'flex-end',
        marginTop: '25px',
    },
}));

export function DetailsStep(props: IDetailsStepProps) {
    const classes = useStyles();

    function checkFields() {
        props.onNextStep();
    }

    const { business } = props;
    return (
        <Grid className={classes.root} container direction="column">
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
                spacing={5}
                className={classes.content}
            >
                <Listing
                    id={undefined}
                    business={business}
                    isEditMode={true}
                    onChangeOwnerBio={props.onChangeOwnerBio}
                    onChangeAbout={props.onChangeAbout}
                    isFavorited={false}
                    onToggleFavorite={console.log}
                />
            </Grid>
            <Button
                onClick={checkFields}
                className={classes.continue}
                variant="contained"
                color="primary"
            >
                {props.creating ? (
                    <>
                        <CircularProgress className={classes.progress} />
                    </>
                ) : (
                    strings.buttons.createListing
                )}
            </Button>
            {props.creating && (
                <Overlay>
                    <CircularProgress />
                </Overlay>
            )}
        </Grid>
    );
}
