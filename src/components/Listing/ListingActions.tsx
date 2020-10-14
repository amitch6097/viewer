import ButtonGroup from '@material-ui/core/ButtonGroup';
import {
    makeStyles
} from '@material-ui/core/styles';
import * as Icons from '@material-ui/icons';
import React from 'react';
import { IBusinessListing } from '../../../typings/types';
import { ActionButton } from '../../components/ActionButton';
import { config } from '../../config';
import { strings } from '../../strings';

export interface IListingActionsProps {
    business: IBusinessListing;
    isEditMode?: boolean;
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

function getActionIcon(key) {
    const Icon = Icons[config.actions[key].icon];
    return <Icon />;
}

export function ListingActions(props: IListingActionsProps) {
    const classes = useStyles();
    const disabled = props.isEditMode;
    return (
        <ButtonGroup
            className={classes.root}
            orientation="vertical"
            color="primary"
        >
            {['address', 'website', 'phone', 'email'].map((key) => {
                const value = key === 'address' ? props.business[key].name : props.business[key];
                return (
                    props.business[key] && (
                        <ActionButton
                            disabled={disabled}
                            label={strings.actions[key]}
                            icon={getActionIcon(key)}
                            subLabel={value}
                        />
                    )
                );
            })}
        </ButtonGroup>
    );
}
