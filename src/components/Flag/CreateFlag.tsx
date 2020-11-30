import { Button, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import React from 'react';
import { strings } from 'src/strings';
import { IFlagDocument } from 'typings/documents';
import { Select } from '../../components/Select';
import { getFlagTypes, onChangeValue } from '../../helpers';

export interface ICreateFlagProps {
    onSubmit: (flag: { type: IFlagDocument['type']; text: string }) => void;
    placeholder: string;
    submitText: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px',
        border: `1px solid ${theme.palette.grey[300]}`,
        borderRadius: '10px',
    },
    textarea: {
        padding: '5px',
        resize: 'none',
        border: 'none',
        '&:focus': {
            border: 'none',
            outline: 'none',
        },
    },
    submitContainer: {
        padding: '0px',
    },
    error: {
        marginLeft: theme.spacing(1),
        color: theme.palette.error.main,
    },
}));

const flagTypes = getFlagTypes();

export function CreateFlag(props: ICreateFlagProps) {
    const theme = useTheme();
    const classes = useStyles(theme);
    const [text, setText] = React.useState('');
    const [type, setType] = React.useState(undefined);
    const [error, setError] = React.useState(undefined);

    function onSubmit() {
        if (!type) {
            setError(strings.flag.error.noType);
        } else if (!text || text.length < 50) {
            setError(strings.flag.error.noText);
        } else if (props.onSubmit) {
            props.onSubmit({
                text,
                type,
            });
        }
    }
    return (
        <Grid container direction="column" className={classes.root}>
            <Select
                withNoSelection={false}
                value={type}
                label={strings.flag.selectLabel}
                onChange={setType}
                options={flagTypes}
            />
            <TextareaAutosize
                className={classes.textarea}
                rowsMin={5}
                placeholder={props.placeholder}
                onChange={onChangeValue(setText)}
                value={text}
            />
            <Grid container direction="row" alignItems="center" className={classes.submitContainer}>
                <Button onClick={onSubmit} variant="contained" color="primary">
                    {props.submitText}
                </Button>
                {error && (
                    <Typography variant="body1" className={classes.error}>
                        {error}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
}
