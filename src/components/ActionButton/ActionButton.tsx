import React from 'react';
import './ActionButton.less';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export interface IActionButtonProps {
    label: string;
    subLabel: string;
    icon: React.ReactElement;
}

{
    /* <ButtonGroup
orientation="vertical"
color="primary"
aria-label="vertical outlined primary button group"
>
    <ActionButton />
</ButtonGroup> */
}

export function ActionButton(props: IActionButtonProps) {
    return (
        <Button
            {...props}
            classes={{
                root: 'bb-action-button',
                label: 'bb-action-button__label',
            }}
        >
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Typography
                    classes={{
                        root: 'bb-action-button__label--label',
                    }}
                    variant="button"
                >
                    {props.label}
                </Typography>
                <Typography
                    classes={{
                        root: 'bb-action-button__label--sub-label',
                    }}
                    variant="caption"
                >
                    {props.subLabel}
                </Typography>
            </Grid>
            {props.icon}
        </Button>
    );
}
