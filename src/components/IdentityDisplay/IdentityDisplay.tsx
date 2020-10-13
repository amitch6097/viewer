import React from 'react';
import './IdentityDisplay.less';

import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export interface IIdentityDisplayProps {
    label: string;
    src: string;
    text: string;
    isEditMode?: boolean;
    onChangeText?: (text: string) => void;
}

export function IdentityDisplay(props: IIdentityDisplayProps) {
    
    function Text() {
        return props.isEditMode ? (
            <TextareaAutosize
                style={{ width: '100%' }}
                aria-label="empty textarea"
                rowsMin={3}
                onChange={(e) =>
                    props.onChangeText && props.onChangeText(e.target.value)
                }
                value={props.text}
            />
        ) : (
            <Typography variant="body1">{props.text}</Typography>
        );
    }

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
                    <Text />
                </div>
            </div>
        </div>
    );
}
