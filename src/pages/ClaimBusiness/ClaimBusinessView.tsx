import { Button, Divider, LinearProgress, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { IBusinessListing } from 'typings/types';

export interface IClaimBusinessViewProps {
    business: IBusinessListing;
    onClickClaimWithEmail: () => void;
    onClickClaimWithPhone: () => void;
    onSubmitPhoneNumberCode: (code: string) => void;
    canClaimWithEmail: boolean;
<<<<<<< HEAD
    canClaimWithPhone: boolean;
=======
>>>>>>> master
    readyForPhoneCode: boolean;
    usePhoneButtonId: string;
    error: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 'var(--page-height)',
        paddingTop: 'var(--page-padding)',
        paddingBottom: 'var(--page-padding)',
    },
    error: {
        color: 'red',
    },
    divider: {
        marginBottom: theme.spacing(3),
    },
    claimOption: {
        marginBottom: theme.spacing(3),
    },
}));

export function ClaimBusinessView(props: IClaimBusinessViewProps) {
    const classes = useStyles();
    const [code, setCode] = React.useState(undefined);

    function handleSubmitPhoneNumberCode() {
        if (code && props.onSubmitPhoneNumberCode) {
            props.onSubmitPhoneNumberCode(code);
        }
    }

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {`Claim "${props.business?.name}"`}
            </Typography>
<<<<<<< HEAD
            <Typography variant="body2">
                To Claim a business you first need to have access to test
                messages on the business phone number this business is
                associated with or have an email account registered with the
                business website.
            </Typography>
            {props.business ? (
                <form>
                    <Grid container direction="column">
                        <Grid item className={classes.claimOption}>
                            <Divider className={classes.divider} />
                            <Typography variant="subtitle1">
                                Claim with Phone Number
                            </Typography>
                            <Typography variant="body2">
                                Using this method you will recieve a text
                                message with a code at the business phone number
                                associated with this business.
                            </Typography>
                            <Grid container direction="row">
                                <Typography variant="subtitle1">
                                    {props.business.phone}
                                </Typography>
                                {props.readyForPhoneCode && (
                                    <input
                                        value={code}
                                        onChange={(e) =>
                                            setCode(e.target.value)
                                        }
                                    />
                                )}
                                <button
                                    id={props.usePhoneButtonId}
                                    disabled={!props.canClaimWithPhone}
                                    onClick={
                                        props.readyForPhoneCode
                                            ? handleSubmitPhoneNumberCode
                                            : props.onClickClaimWithPhone
                                    }
                                >
                                    {props.readyForPhoneCode
                                        ? 'Submit'
                                        : 'Send Code'}
                                </button>
                                {props.error && (
                                    <Typography
                                        variant="body2"
                                        className={classes.error}
                                    >
                                        {props.error}
                                    </Typography>
                                )}
                            </Grid>
                            {!props.canClaimWithPhone && (
                                <Typography
                                    variant="body2"
                                    className={classes.error}
                                >
                                    You can not claim this business with this
                                    phone number because it is already being
                                    user with another account. Try logging in
                                    with that phone number instead.
                                </Typography>
                            )}
                        </Grid>
                        <Grid item className={classes.claimOption}>
=======
            {props.business ? (
                <form>
                    <Typography variant="subtitle1">
                        Claim with Phone Number
                    </Typography>
                    <Typography variant="body2">
                        Using this method you will recieve a text message with a
                        code at the business phone number associated with this
                        business.
                    </Typography>
                    <Grid container direction="row">
                        <Typography variant="subtitle1">
                            {props.business.phone}
                        </Typography>
                        {props.readyForPhoneCode && (
                            <input
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        )}
                        <button
                            id={props.usePhoneButtonId}
                            onClick={
                                props.readyForPhoneCode
                                    ? handleSubmitPhoneNumberCode
                                    : props.onClickClaimWithPhone
                            }
                        >
                            {props.readyForPhoneCode ? 'Submit' : 'Send Code'}
                        </button>
                        {
                            props.error && (
                                <Typography variant="body2">
                                    {props.error}
                                </Typography>
                            )
                        }
                    </Grid>
                    {props.canClaimWithEmail && (
                        <>
                            <Divider />
>>>>>>> master
                            <Typography variant="subtitle1">
                                Claim with Email
                            </Typography>
                            <Typography variant="body2">
                                Using this method you will automatically be able
                                to claim this business because your current
                                email address has the business domain associated
                                with it.
                            </Typography>
<<<<<<< HEAD
                            <Button
                                color="primary"
                                onClick={props.onClickClaimWithEmail}
                                disabled={!props.canClaimWithEmail}
                            >
                                {'Claim With Email'}
                            </Button>
                            {!props.canClaimWithEmail && (
                                <Typography
                                    variant="body2"
                                    className={classes.error}
                                >
                                    You can not claim this business your email
                                    does not have the correct root. You need a
                                    email account with the address{' '}
                                    {props.business.websiteRoot}. Example
                                    john1234@{props.business.websiteRoot}.
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
=======
                            <Button onClick={props.onClickClaimWithEmail}>
                                {'Claim With Email'}
                            </Button>
                        </>
                    )}
>>>>>>> master
                </form>
            ) : (
                <LinearProgress />
            )}
        </Container>
    );
}
