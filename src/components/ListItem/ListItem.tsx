import React from 'react';
import './ListItem.less';

import List from '@material-ui/core/List';
import ListItem_M from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';

export interface ListItemProps {}

export function ListItem(props: ListItemProps) {
    return (
        <ListItem_M button>
            <ListItemAvatar>
                <Avatar
                    alt={`avatar`}
                    src={`https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png`}
                />
            </ListItemAvatar>
            <ListItemText
                primary={`Name`}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            style={{
                                display: 'inline',
                            }}
                            color="textPrimary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                }
            />
            <Fab disabled aria-label="like">
                <FavoriteIcon />
            </Fab>
        </ListItem_M>
    );
}
