import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';

export function OwnerCardAdd({ onAddOwner }) {
    return (
        <Paper elevation={3}>
            <Grid
                classes={{ root: 'bb-owner-card' }}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <IconButton
                    onClick={onAddOwner}
                    color="primary"
                    component="span"
                >
                    <AddIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Paper>
    );
}
