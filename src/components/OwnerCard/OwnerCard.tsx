import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ClearIcon from '@material-ui/icons/Clear';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React from 'react';
import { TextField } from '../../components/TextField';
import './OwnerCard.less';



export interface IOwnerCardProps {
    error?: string;
    name: string;
    position: string;
    image: string;
    onChangeImage: (imageURL: string) => void;
    onChangePosition: (position: string) => void;
    onChangeName: (name: string) => void;
    withDelete: boolean;
    removeOwner: () => void;
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
                        src={props.image}
                    />
                    <div className="bb-owner-card__avatar-upload">
                        <input
                            className={'bb-owner-card__avatar-upload-input'}
                            accept="image/*"
                            id="icon-button-photo"
                            onChange={(e) => {
                                props.onChangeImage(URL.createObjectURL(e.target.files[0]))
                            }}
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
                    error={props.error}
                    required={true}
                    id="name"
                    key="name"
                    label="Name"
                    value={props.name}
                    onChange={props.onChangeName}
                />
                <TextField
                    className="bb-owner-card__avatar-container-sub-label"
                    id="position"
                    key="position"
                    label="Position"
                    value={props.position}
                    onChange={props.onChangePosition}
                />
            </Grid>
        </Paper>
    );
}
