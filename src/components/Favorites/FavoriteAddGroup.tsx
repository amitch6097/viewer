import { Button, TextField, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

export interface IFavoriteAddGroupProps {
    onSave: (text: string) => void;
}

export function FavoriteAddGroup(props: IFavoriteAddGroupProps) {
    const [active, setActive] = React.useState(false);
    const [text, setText] = React.useState('');

    function handleSave() {
        setActive(false);
        if (props.onSave) {
            props.onSave(text);
        }
    }

    return (
        <Grid>
            {active ? (
                <>
                    <Typography>Name your Group</Typography>
                    <Typography>
                        Use this to keep track of the businesses you love.
                    </Typography>
                    <TextField
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
                            variant="outlined"
                            onClick={() => setActive(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </>
            ) : (
                <ListItem button onClick={() => setActive(true)}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create a new Business Group" />
                </ListItem>
            )}
        </Grid>
    );
}
