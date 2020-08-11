import React from 'react';
import './OwnerCard.less';

import Grid from '@material-ui/core/Grid';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';

import { IOwner } from '../../../typings/types';
import { onChangeValue } from '../../helpers';
import { TextField } from '../../components/TextField';

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
        <Paper
            classes={{
                root: 'paper',
            }}
            elevation={3}
        >
            <Grid
                classes={{ root: 'bb-owner-card' }}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                <div className="bb-owner-card__avatar-container">
                    <Avatar
                        classes={{
                            root: 'bb-owner-card__avatar-container-avatar',
                        }}
                        src={props.owner.image?.url}
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
                                <ClearIcon />
                            </IconButton>
                        </div>
                    )}
                </div>
                <TextField
                    className="bb-owner-card__avatar-container-label"
                    error={props.errors?.name}
                    required={true}
                    id="name"
                    key="name"
                    label="Name"
                    value={props.owner.name}
                    onChange={props.onChangeValue('name')}
                />
                <TextField
                    className="bb-owner-card__avatar-container-sub-label"
                    id="position"
                    key="position"
                    label="Position"
                    value={props.owner.position}
                    onChange={props.onChangeValue('position')}
                />
            </Grid>
        </Paper>
    );
}
