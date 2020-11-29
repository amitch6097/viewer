import React, { useEffect, useContext } from 'react';
import { IBusinessListing } from 'typings/types';
import Container from '@material-ui/core/Container';
import { IInfoStepState, InfoStep } from '../Create/Steps/InfoStep';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import * as firebase from 'firebase';
import { API } from '../../services/';

export interface IClaimBusinessViewProps {
    business: IBusinessListing;
    onClaimWithPhone: () => void;
    onClaimWithEmail: () => void;
    canClaimWithEmail: boolean;
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

    const ref = React.useRef(null);

    function onSignInSubmit() {
        var phoneNumber = '+12488604199';
        //@ts-ignore
        var appVerifier = window.recaptchaVerifier;
        firebase
            .auth()
            .signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                //@ts-ignore
                window.confirmationResult = confirmationResult;
            })
            .catch(function (error) {
                console.warn(error);
                // Error; SMS not sent
                // ...
            });
    }

    useEffect(() => {
        firebase.auth().useDeviceLanguage();
        //@ts-ignore
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': function(response) {
                onSignInSubmit();
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            'expired-callback': function() {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          });

        // //@ts-ignore
        // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        //     'sign-in-button',
        //     {
        //         size: 'invisible',
        //         callback: function (response) {
        //             // reCAPTCHA solved, allow signInWithPhoneNumber.
        //             onSignInSubmit();
        //         },
        //     }
        // );
    }, [ref]);

    return (
        <Container className={classes.root}>
            <Typography variant="h4" gutterBottom>
                {'Claim ' + props.business?.name}
            </Typography>
            <form>
                <div id="recaptcha-container">

                </div>
                {/* @ts-ignore */}
                <button id={ 'sign-in-button'} onClick={onSignInSubmit} >
                    Claim With Phone Number
                </button>
                {props.canClaimWithEmail && <Button onClick={props.onClaimWithEmail}>
                    {'Claim With Email'}
                </Button>}
            </form>
        </Container>
    );
}
