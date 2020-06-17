import React from 'react';
import './OwnerCard.less';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import { IOwner } from '../../../typings/types';
import { onChangeValue } from '../../helpers';

export interface IOwnerCardProps {
    owner: IOwner;
    onAddOwnerImage: (e: any) => void;
    withDelete: boolean;
    removeOwner: () => void;
    onChangeValue: (key: string) => (value: string) => void;
    errors?: {
        name: string;
    };
}

export function OwnerCard(props: IOwnerCardProps) {
    return (
        <Paper elevation={3} >
        <Grid
            classes={{ root: 'bb-owner-card' }}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <div className="bb-owner-card__avatar-container">
                <Avatar
                    classes={{ root: 'bb-owner-card__avatar-container-avatar' }}
                    src={props.owner.image}
                />
                <div className="bb-owner-card__avatar-upload">
                    <input
                        className={'bb-owner-card__avatar-upload-input'}
                        accept="image/*"
                        id="icon-button-photo"
                        onChange={props.onAddOwnerImage}
                        type="file"
                    />
                    <label htmlFor="icon-button-photo">
                        <IconButton color="primary" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                {props.withDelete && (
                    <div className="bb-owner-card__avatar-delete">
                        <IconButton
                            onClick={props.removeOwner}
                            color="primary"
                            component="span"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </div>
                )}
            </div>
            <TextField
                classes={{ root: 'bb-owner-card__avatar-container-label' }}
                error={Boolean(props.errors?.name)}
                helperText={props.errors?.name}
                required
                id="name"
                key="name"
                label="Name"
                value={props.owner.name}
                size="medium"
                onChange={onChangeValue(props.onChangeValue('name'))}
            />
            <TextField
                classes={{ root: 'bb-owner-card__avatar-container-sub-label' }}
                id="position"
                key="position"
                label="Position"
                size="small"
                value={props.owner.position}
                onChange={onChangeValue(props.onChangeValue('position'))}
            />
        </Grid>
        </Paper>
    );
}
