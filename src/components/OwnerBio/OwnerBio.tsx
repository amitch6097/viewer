import React from 'react';
import './OwnerBio.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { IOwner } from '../../../typings/types';
import { onChangeValue } from '../../helpers';

export interface IOwnerBioProps {
    onChangeOwnerBio?: (bio: string) => void;
    owner: IOwner;
    isEditable?: boolean;
}

export function OwnerBio(props: IOwnerBioProps) {
    const { owner, isEditable } = props;
    return (
        <div className="bb-owner-bio">
            <div className="bb-owner-bio__meta">
                <Avatar
                    classes={{
                        root: 'bb-owner-bio__avatar',
                    }}
                    src={owner.image?.url}
                />
                <div className="bb-owner-bio__meta-text">
                    <Typography
                        classes={{
                            root: 'bb-owner-bio__name',
                        }}
                        variant="h6"
                    >
                        {owner.name}
                    </Typography>
                    <Typography
                        classes={{
                            root: 'bb-owner-bio__position',
                        }}
                        variant="caption"
                    >
                        {owner.position}
                    </Typography>
                </div>
            </div>
            <Typography variant="caption">About</Typography>
            {isEditable ? (
                <TextareaAutosize
                    style={{ width: '100%' }}
                    aria-label="about this owner"
                    rowsMin={3}
                    onChange={onChangeValue(props.onChangeOwnerBio)}
                    value={owner.bio}
                />
            ) : (
                <Typography variant="body1">{owner.bio}</Typography>
            )}
        </div>
    );
}
