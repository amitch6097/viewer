import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { IOwner } from '../../../../typings/types';
import { OwnerCard } from '../../../components/OwnerCard';
import { strings } from '../../../strings';
import { generateGUID } from '../../../helpers';
import { useForm, IFormItem } from '../../../hooks/useForm';
export interface IOwnerStepProps {
    onNextStep: (state: OwnerStepState) => void;
}

export type OwnerStepState = Record<
    string,
    {
        name: string;
        position: string;
        image: {
            id: string;
            url: string;
        };
    }
>;

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

function addOwnerToForm(
    form: Record<string, IFormItem>
): Record<string, IFormItem> {
    const guid = generateGUID();
    return {
        ...form,
        [guid]: {
            label: 'owner',
            value: {
                name: undefined,
                position: undefined,
                image: undefined,
            },
            errorString: 'Please Provide a Name',
            hasError: (state) => !state[guid].value.name,
        },
    };
}

function removeOwnerFromForm(
    form: Record<string, IFormItem>,
    key: string
): Record<string, IFormItem> {
    const formCopy = { ...form };
    delete formCopy[key];
    return formCopy;
}

export function OwnerStep(props: IOwnerStepProps) {
    const classes = useStyles();

    const { onSubmit, state, updateValue, setState } = useForm(
        addOwnerToForm({}),
        (values) => props.onNextStep(values as OwnerStepState)
    );

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
                    {Object.keys(state).map((key, index) => {
                        return (
                            <Grid item key={key}>
                                <OwnerCard
                                    error={
                                        state[key].error &&
                                        state[key].errorString
                                    }
                                    name={state[key].value.name}
                                    image={state[key].value.image?.url}
                                    position={state[key].value.position}
                                    withDelete={Object.keys(state).length > 1}
                                    removeOwner={() =>
                                        setState(
                                            removeOwnerFromForm(state, key)
                                        )
                                    }
                                    onChangeName={(name) => {
                                        updateValue(key, {
                                            ...state[key].value,
                                            name,
                                        });
                                    }}
                                    onChangePosition={(position) => {
                                        updateValue(key, {
                                            ...state[key].value,
                                            position,
                                        });
                                    }}
                                    onChangeImage={(url) => {
                                        updateValue(key, {
                                            ...state[key].value,
                                            image: {
                                                url,
                                                id: generateGUID()
                                            }
                                        });
                                    }}
                                />
                            </Grid>
                        );
                    })}
                    <Grid item>
                        <IconButton
                            onClick={() => setState(addOwnerToForm(state))}
                            color="primary"
                            component="span"
                        >
                            <AddIcon fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>

            <Button
                onClick={onSubmit}
                className={classes.continue}
                variant="contained"
                color="primary"
            >
                {strings.buttons.continue}
            </Button>
        </Grid>
    );
}
