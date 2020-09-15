import React from 'react';
import './Listing.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ListingTitleCard } from './ListingTitleCard';
import {
    Theme,
    createStyles,
    makeStyles,
    useTheme,
} from '@material-ui/core/styles';
import { config } from '../../config';

import * as Icons from '@material-ui/icons';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { IdentityDisplay } from '../../components/IdentityDisplay';
import { IBusinessListing } from '../../../typings/types';
import { onChangeValue } from '../../helpers';
import { strings } from '../../strings';
import { OwnerBio } from '../../components/OwnerBio';

import { ActionButton } from '../../components/ActionButton';

export interface IListingProps {
    business: IBusinessListing;
    isEditable?: boolean;
    onChangeAbout?: (about: string) => void;
}

const useStyles = makeStyles({
    root: {
        minWidth: 300,
    },
});

function getActionIcon(key) {
    const Icon = Icons[config.actions[key].icon];
    return <Icon />;
}

export function ListingActions(props: IListingProps) {
    const classes = useStyles(props);

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
