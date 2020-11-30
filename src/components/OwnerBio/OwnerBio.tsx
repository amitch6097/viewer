import React from 'react';
import './OwnerBio.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import { IOwner } from '../../../typings/types';
import { onChangeValue } from '../../helpers';

export interface IOwnerBioProps {
    owner: IOwner;
    isEditMode?: boolean;
    onChangeAbout?: (about: string) => void;
}

export function OwnerBio(props: IOwnerBioProps) {
    const { owner } = props;
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
                    {props.isEditMode ? (
                        <TextareaAutosize
                            style={{ width: '100%' }}
                            aria-label="About the Owner"
                            placeholder="About the Owner"
                            rowsMin={3}
                            onChange={onChangeValue(props.onChangeAbout)}
                            value={owner.bio}
                        />
                    ) : (
                        <Typography variant="body1">{owner.bio}</Typography>
                    )}
                </div>
            </div>
        </div>
    );
}
