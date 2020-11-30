import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { IBusinessListing, IOwner } from '../../../../typings/types';
import { Listing } from '../../../components/Listing';
import { strings } from '../../../strings';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Overlay } from '../../../components/Overlay';
import { IdentifyStepState } from './IdentifyStep';
import { OwnerStepState } from './OwnerStep';
import { IInfoStepState } from './InfoStep';
import { generateGUID } from '../../../helpers';
import { useForm } from '../../../hooks/useForm';

export interface IDetailsStepProps {
    name: string;
    info: IInfoStepState;
    owner: OwnerStepState;
    identify: IdentifyStepState;
    onCreateListing: (business: IBusinessListing) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        paddingTop: '20px',
        minHeight:
            'calc(var(--page-height) - var(--page-padding) - var(--page-padding) - 20px)',
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

function formatBusiness({
    about,
    name,
    info,
    owners,
    identify,
}: {
    about: string;
    name: string;
    info: IInfoStepState;
    owners: IOwner[];
    identify: IdentifyStepState;
}): IBusinessListing {
    return {
        id: undefined,
        name,
        guid: generateGUID(),
        ...info,
        identify,
        owners,
        about,
    };
}

export function DetailsStep(props: IDetailsStepProps) {
    const classes = useStyles();
    const [creating, setCreating] = React.useState(false);

    function handleCreateListing(values: { owners: IOwner[]; about: string }) {
        setCreating(true);
        const business = formatBusiness({
            ...props,
            owners: values.owners,
            about: values.about,
        });
        props.onCreateListing(business);
    }

    const { onSubmit, state, updateValue } = useForm(
        {
            owners: {
                value: props.owner ? Object.values(props.owner) : [],
            },
            about: {
                value: undefined,
            },
        },
        handleCreateListing
    );

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
                    id={props.name}
                    isEditMode={true}
                    isFavorited={false}
                    business={formatBusiness({
                        ...props,
                        owners: state.owners.value,
                        about: state.about.value,
                    })}
                    onChangeOwnerBio={(index: number) => (bio: string) => {
                        const nextOwners = [...state.owners.value];
                        nextOwners[index] = {
                            ...nextOwners[index],
                            bio,
                        };
                        updateValue('owners', nextOwners);
                    }}
                    onChangeAbout={(about) => {
                        updateValue('about', about);
                    }}
                    onToggleFavorite={console.log}
                />
            </Grid>
            <Button
                onClick={onSubmit}
                className={classes.continue}
                variant="contained"
                color="primary"
            >
                {creating ? (
                    <>
                        <CircularProgress className={classes.progress} />
                    </>
                ) : (
                    strings.buttons.createListing
                )}
            </Button>
            {creating && (
                <Overlay>
                    <CircularProgress />
                </Overlay>
            )}
        </Grid>
    );
}
