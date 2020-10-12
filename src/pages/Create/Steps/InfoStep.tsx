import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React from 'react';
import { IAlgoliaLocationSearchEvent } from 'typings/algolia';
import { EmailMask, PhoneMask } from '../../../components/Masks';
import { LocationAutocomplete } from '../../../components/Search';
import { Select } from '../../../components/Select';
import { getCategories, onChangeValue } from '../../../helpers';
import { Business } from '../../../lib/Business';
import { strings } from '../../../strings';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface IInfoStepProps {
    category: string;
    phone: string;
    email: string;
    address: string;
    website: string;
    onChangeBusiness: (business: Business) => void;
    business: Business;
    onChangeCategory: (str: string) => void;
    onChangePhone: (str: string) => void;
    onChangeEmail: (str: string) => void;
    onChangeAddress: (str: string) => void;
    onChangeWebsite: (str: string) => void;
    onNextStep: () => void;
    onClickAddressSuggestion: (event: IAlgoliaLocationSearchEvent) => void;
}

export interface IInfoStepState {
    categoryError: string;
    phoneError: string;
    emailError: string;
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

export function InfoStep(props: IInfoStepProps) {
    const classes = useStyles();

    const [state, setState] = React.useState({
        categoryError: '',
        phoneError: '',
        emailError: '',
    });

    function checkFields() {
        const nextErrors: IInfoStepState = {
            categoryError: '',
            phoneError: '',
            emailError: '',
        };
        let hasError = false;

        if (!props.category) {
            hasError = true;
            nextErrors.categoryError = strings.create.info.errors.category;
        }
        if (!props.phone) {
            hasError = true;
            nextErrors.phoneError = strings.create.info.errors.phone;
        }
        if (!props.email) {
            hasError = true;
            nextErrors.emailError = strings.create.info.errors.email;
        }

        setState({
            ...nextErrors,
        });

        if (!hasError) {
            props.onNextStep();
        }
    }

    const {
        image,
        category,
        phone,
        email,
        address,
        website,
    } = props.business.getData();
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
                        className={classes.input}
                        error={state.categoryError}
                        value={props.category}
                        label={strings.create.info.labels.category}
                        onChange={props.onChangeCategory}
                        options={getCategories()}
                    />
                    <OutlinedInput
                        className={`${classes.input} ${classes.showLegend}`}
                        value={props.phone}
                        onChange={onChangeValue(props.onChangePhone)}
                        name="phone"
                        error={Boolean(state.phoneError)}
                        // helperText={state.phoneError}
                        label={strings.create.info.labels.phone + ' &nbsp;*'}
                        inputComponent={PhoneMask}
                    />
                    <OutlinedInput
                        className={`${classes.input} ${classes.showLegend}`}
                        error={Boolean(state.emailError)}
                        // helperText={state.emailError}
                        value={props.email}
                        onChange={onChangeValue(props.onChangeEmail)}
                        name="email"
                        label={strings.create.info.labels.email + ' &nbsp;*'}
                        inputComponent={EmailMask}
                    />
                    <LocationAutocomplete
                        onChange={props.onChangeAddress}
                        onClickSuggestion={props.onClickAddressSuggestion}
                        label={strings.create.info.labels.address}
                        useTextField={true}
                        className={classes.input}
                    />
                    <TextField
                        className={classes.input}
                        key="website"
                        id="website"
                        label={strings.create.info.labels.website}
                        variant="outlined"
                        value={props.website}
                        onChange={onChangeValue(props.onChangeWebsite)}
                    />
                </Grid>
                <Grid xs={12} md={6} item>
                    <input
                        className={classes.input}
                        accept="image/*"
                        id="icon-button-photo"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            const url = URL.createObjectURL(file);
                            props.onChangeBusiness(
                                props.business.onAddImage(url)
                            );
                        }}
                        type="file"
                    />
                    <Avatar className={classes.image} src={image?.url} />
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
