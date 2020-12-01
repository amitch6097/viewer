import {
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Delete, Check } from '@material-ui/icons';
import React from 'react';
import { IBusinessFlag } from 'src/lib/BusinessFlag';
import { IBusinessUpdateRequest } from 'src/lib/BusinessUpdateRequest';
import { strings } from 'src/strings';

export interface IUpdateRequestProps {
    updateRequest: IBusinessUpdateRequest;
    onDelete: () => void;
    onAccept: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow: 'nowrap',
        display: 'flex',
        flexDirection: 'column',
    },
    updateChanges: {
        listStyleType: 'none',
        padding: '0px',
    },
    updateChange: {},
    date: {},
    content: {
        padding: theme.spacing(2),
    },
    actions: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
}));

export function UpdateRequest(props: IUpdateRequestProps) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const { updateRequest } = props;

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography className={classes.date}>
                    {new Date(updateRequest.createdAt).toLocaleDateString()}{' '}
                </Typography>
                <ul className={classes.updateChanges}> 
                    {updateRequest?.updateData &&
                        Object.keys(updateRequest.updateData).map((key) => {
                            const defined = updateRequest.updateData[key];
                            let value = defined;
                            if (defined && key === 'address') {
                                value = defined.name;
                            }
                            return defined ? (
                                <li className={classes.updateChange}>
                                    <Typography variant="subtitle1">
                                        {key.toString()}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {value.toString()}
                                    </Typography>
                                </li>
                            ) : (
                                <></>
                            );
                        })}
                </ul>
            </CardContent>
            <CardActions className={classes.actions}>
                <IconButton aria-label="delete" onClick={props.onDelete}>
                    <Delete />
                </IconButton>
                <IconButton aria-label="confirm" onClick={props.onAccept}>
                    <Check />
                </IconButton>
            </CardActions>
        </Card>
    );
}
