import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { IOwner } from '../../../../typings/types';
import { OwnerCard } from '../../../components/OwnerCard';
import { strings } from '../../../strings';

export interface IOwnerStepProps {
    onNextStep: () => void;
    onAddOwnerImage: (index: number) => (e: any) => void;
    removeOwner: (index) => () => void;
    onChangeOwnerValue: (
        index: number
    ) => (key: string) => (value: string) => void;
    addOwner: () => void;
    owners: IOwner[];
}

export interface IOwnerStepState {
    errors: Array<{
        name: string;
    }>;
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
    continue: {
        alignSelf: 'flex-end',
    },
}));

export function OwnerStep(props: IOwnerStepProps) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        errors: [
            {
                name: undefined,
            },
        ],
    });

    function checkFields() {
        const { owners } = props;
        let hasErrors = false;

        const errors = Object.values(owners).map((owner) => {
            const name = !Boolean(owner.name);

            if (name) {
                hasErrors = true;
            }

            return {
                name: name ? 'Please Provide a Name' : '',
            };
        });

        setState({
            errors,
        });

        if (!hasErrors) {
            props.onNextStep();
        }
    }

    const { owners } = props;
    return (
        <Grid className={classes.root} container direction="column">
            <Grid className={classes.content}>
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    spacing={5}
                >
                    {owners.map((owner, index) => {
                        return (
                            <Grid item>
                                <OwnerCard
                                    errors={state.errors[index]}
                                    // key={owner.name || index}
                                    owner={owner}
                                    withDelete={owners.length > 1}
                                    removeOwner={props.removeOwner(index)}
                                    onChangeValue={props.onChangeOwnerValue(
                                        index
                                    )}
                                    onAddOwnerImage={props.onAddOwnerImage(
                                        index
                                    )}
                                />
                            </Grid>
                        );
                    })}
                    <Grid item>
                        <IconButton
                            onClick={props.addOwner}
                            color="primary"
                            component="span"
                        >
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Button
                onClick={checkFields}
                className={classes.continue}
                variant="contained"
                color="primary"
            >
                {strings.buttons.continue}
            </Button>
        </Grid>
    );
}
