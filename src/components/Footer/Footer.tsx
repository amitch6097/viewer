import React from 'react';
import './Footer';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, useTheme } from '@material-ui/core/styles';

export interface IFooterProps {
}

const useStyles = makeStyles({
    root: {
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#eee',
        padding: '10px',
    },
    title: {
        fontWeight: 700,
    },
    content: {
        paddingLeft: '50px',
    },
    ul: {
        listStyleType: 'none',
        margin: 0,
        padding: 0
    },
    li: {
        marginBottom: 10
    }
});

export function Footer(props: IFooterProps) {
    const classes = useStyles();
    const preventDefault = (event: React.SyntheticEvent) =>
        event.preventDefault();
    return (
        <footer className={classes.root}>
            <Grid className={classes.content} container spacing={5}>
                <Grid item>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        gutterBottom
                    >
                        About
                    </Typography>
                    <ul className={classes.ul}>
                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                About Common Good
                            </Link>
                        </li>
                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                Careers
                            </Link>
                        </li>

                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                Terms Of Service
                            </Link>
                        </li>

                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                Privacy Policy
                            </Link>
                        </li>

                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                Support
                            </Link>
                        </li>

                    </ul>
                </Grid>
                <Grid item>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        gutterBottom
                    >
                        Common Good For Businesses
                    </Typography>
                    <ul className={classes.ul}>
                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                Claim your Business Page
                            </Link>
                        </li>
                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                Create a Free Business Listing
                            </Link>
                        </li>
                        <li className={classes.li} >
                            <Link
                                href="#"
                                onClick={preventDefault}
                                color="inherit"
                            >
                                Business Support
                            </Link>
                        </li>
                    </ul>
                </Grid>
            </Grid>
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    Common Good
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </footer>
    );
}
