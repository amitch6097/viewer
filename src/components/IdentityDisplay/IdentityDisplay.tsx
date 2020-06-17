import React from 'react';
import './IdentityDisplay.less';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

export interface IIdentityDisplayProps {
    label: string;
    src: string;
    text: string;
}

export function IdentityDisplay(props: IIdentityDisplayProps) {
    return (
        <div className="bb-identity-display">
            <div className="bb-identity-display__meta">
                <Avatar
                    classes={{
                        root: 'bb-identity-display__avatar',
                    }}
                    src={props.src}
                />
                <div className="bb-identity-display__meta-text">
                    <Typography
                        classes={{
                            root: 'bb-identity-display__name',
                        }}
                        variant="h6"
                    >
                        {props.label}
                    </Typography>
                </div>
            </div>
            <Typography variant="body1">{props.text}</Typography>
        </div>
    );
}
