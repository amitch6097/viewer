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
                            <Typography variant="subtitle1">
                                Claim with Email
                            </Typography>
                            <Typography variant="body2">
                                Using this method you will automatically be able
                                to claim this business because your current
                                email address has the business domain associated
                                with it.
                            </Typography>
                            <Button onClick={props.onClickClaimWithEmail}>
                                {'Claim With Email'}
                            </Button>
                        </>
                    )}
                </form>
            ) : (
                <LinearProgress />
            )}
        </Container>
    );
}
