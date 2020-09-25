import { Button, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import Box from '@material-ui/core/Box';

export interface IFavoriteAddGroupProps {
    onSave: (text: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            transition: 'min-height linear 0.1s',
        },
        active: {
            minHeight: '200px',
        },
        inactive: {
            minHeight: '50px',
        },
        item: {
            'max-height': '0px',
            transition: 'max-heigh linear 0.1s',
            overflow: 'hidden',
            '&$itemActive': {
                'max-height': 'initial',
            },
        },
        itemActive: {},
        input: {
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            '& > *': {
                marginTop: theme.spacing(1),
            },
        },
        button: {
            marginLeft: theme.spacing(1),
        },
    })
);

export function FavoriteAddGroup(props: IFavoriteAddGroupProps) {
    const classes = useStyles();

    const [active, setActive] = React.useState(false);
    const [text, setText] = React.useState('');

    function handleSave() {
        setActive(false);
        if (props.onSave) {
            props.onSave(text);
        }
    }

    return (
        <Grid
            className={`${classes.root} ${
                active ? classes.active : classes.inactive
            }`}
        >
            <Zoom in={active}>
                <div
                    className={`${classes.item} ${classes.input} ${active ? classes.itemActive : ''}`}
                >
                    <Typography variant="h6">Name your Group</Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Use this to keep track of the businesses you love.
                    </Typography>
                    <TextField
                        fullWidth
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Ex: My Favorite Restaurants"
                        variant="outlined"
                    />
                    <Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!Boolean(text)}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            className={classes.button}
                            variant="outlined"
                            onClick={() => setActive(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </div>
            </Zoom>
            <Zoom in={!active}>
                <div
                    className={`${classes.item} ${active ? '' : classes.itemActive}`}
                >
                    {' '}
                    <ListItem button onClick={() => setActive(true)}>
                        <ListItemIcon>
                            <AddIcon />
                        </ListItemIcon>
                        <ListItemText primary="Create a new Business Group" />
                    </ListItem>
                </div>
            </Zoom>
        </Grid>
    );
}
