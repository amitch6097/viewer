import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import { IBusinessFlag } from 'src/lib/BusinessFlag';
import { strings } from 'src/strings';

export interface IMyReviewProps {
    flag: IBusinessFlag;
    onDelete: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
    },
    businessName: {},
    review: {},
    reviewHeading: {
        display: 'flex',
        flexDirection: 'row',
    },
    reviewHeadingDate: {
        marginLeft: theme.spacing(1),
    },
    content: {
        padding: theme.spacing(2),
    },
    link: {
        fontSize: theme.typography.h4.fontSize,
    },
    actions: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
}));

export function Flag(props: IMyReviewProps) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { flag } = props;

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Grid>
                    <Grid item className={classes.businessName}>
                        <Typography variant="h4" gutterBottom>
                            {strings.flag.types[flag.type]}
                        </Typography>
                    </Grid>
                    <Grid item className={classes.review}>
                        <div className={classes.reviewHeading}>
                            <Typography className={classes.reviewHeadingDate}>
                                {new Date(flag.createdAt).toLocaleDateString()}{' '}
                            </Typography>
                        </div>

                        <Typography>{flag.text}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            {/* <CardActions className={classes.actions}>
                <IconButton aria-label="delete" onClick={props.onDelete}>
                    <DeleteIcon />
                </IconButton>
            </CardActions> */}
        </Card>
    );
}
