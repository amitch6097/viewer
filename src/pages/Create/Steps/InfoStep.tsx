import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useForm } from '../../../hooks/useForm';
import { EmailMask, PhoneMask } from '../../../components/Masks';
import { LocationAutocomplete } from '../../../components/Search';
import { Select } from '../../../components/Select';
import { generateGUID, getCategories } from '../../../helpers';
import { strings } from '../../../strings';
import {IAlgoliaLocationSearchEventSuggestion} from '../../../../typings/algolia';
export interface IInfoStepProps {
    onNextStep: (state: IInfoStepState) => void;
    withImage?: boolean;
    notRequired?: boolean;
    webBusiness?: boolean;
}

export interface IInfoStepState {
    category: string;
    phone: string;
    email: string;
    address: IAlgoliaLocationSearchEventSuggestion;
    website: string;
    image: {
        id: string;
        url: string;
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight:
            'calc(var(--page-height) - var(--page-padding) - var(--page-padding))',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap-reverse',
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        width: '100%',
        margin: theme.spacing(1),
    },
    showLegend: {
        '& legend': {
            maxWidth: '1000px !important',
            visibility: 'visible',
        },
    },
    image: {
        borderRadius: '5px',
        height: 'unset',
        width: 'unset',
    },
    continue: {
        alignSelf: 'flex-end',
    },
}));

const CATEGORIES = getCategories();

export function InfoStep(props: IInfoStepProps) {
    const classes = useStyles();
    const addressRequired = props.webBusiness ? false : !props.notRequired;
    const websiteRequired = props.webBusiness ? true : !props.notRequired;

    const {onSubmit, state, updateValue} = useForm({
        category: {
            value: undefined,
            error: undefined,
            label: strings.create.info.labels.category,
            required: !props.notRequired,
        },
        phone: {
            value: undefined,
            error: undefined,
            label: strings.create.info.labels.phone + ' &nbsp;*',
            required: !props.notRequired,
        },
        email: {
            value: undefined,
            error: undefined,
            label: strings.create.info.labels.email + ' &nbsp;*',
            required: !props.notRequired,
        },
        address: {
            value: undefined,
            error: undefined,
            label: strings.create.info.labels.address,
            required: addressRequired
        },
        website: {
            value: undefined,
            error: undefined,
            label: strings.create.info.labels.website,
            required: websiteRequired,
        },
        image: {
            value: undefined,
            error: undefined,
            label: undefined,
        },
    }, props.onNextStep);

    return (
        <Grid className={classes.root} container direction="column">
            <Grid
                className={classes.content}
                container
                direction="row"
                spacing={5}
            >
                <Grid
                    item
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                    xs={12}
                    md={6}
                    className={classes.inputs}
                    spacing={3}
                >
                    <Select
                        {...state['category']}
                        className={classes.input}
                        onChange={(value) => updateValue('category', value)}
                        options={CATEGORIES}
                    />
                    <OutlinedInput
                        {...state['phone']}
                        className={`${classes.input} ${classes.showLegend}`}
                        id="phone"
                        name="phone"
                        onChange={(e) => updateValue('phone', e.target.value)}
                        inputComponent={PhoneMask}
                    />
                    <OutlinedInput
                        {...state['email']}
                        className={`${classes.input} ${classes.showLegend}`}
                        onChange={(e) => updateValue('email', e.target.value)}
                        name="email"
                        inputComponent={EmailMask}
                    />
                    {!props.webBusiness && <LocationAutocomplete
                        {...state['address']}
                        className={classes.input}
                        onClickSuggestion={(value) =>
                            updateValue('address', value.suggestion)
                        }
                        useTextField={true}
                    />}
                    <TextField
                        {...state['website']}
                        className={classes.input}
                        id="website"
                        name="website"
                        variant="outlined"
                        onChange={(e) => updateValue('website', e.target.value)}
                    />
                </Grid>
                {props.withImage && (<Grid xs={12} md={6} item>
                    <input
                        className={classes.input}
                        accept="image/*"
                        id="icon-button-photo"
                        onChange={(e: any) =>
                            updateValue(
                                'image',
                                {
                                    url: URL.createObjectURL(e.target.files[0]),
                                    id: generateGUID()
                                }
                            )
                        }
                        type="file"
                    />
                    <Avatar
                        className={classes.image}
                        src={state['image'].value?.url}
                    />
                </Grid>)}
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
