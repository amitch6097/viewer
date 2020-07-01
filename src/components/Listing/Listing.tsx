import React from 'react';
import './Listing.less';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import * as Icons from '@material-ui/icons';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';

import { IBusinessListing } from '../../../typings/types';
import { onChangeValue } from '../../helpers';
import { strings } from '../../strings';
import { config } from '../../config';

import { OwnerBio } from '../../components/OwnerBio';
import { IdentityDisplay } from '../../components/IdentityDisplay';
import { ActionButton } from 'src/components/ActionButton';

export interface IListingProps {
    business: IBusinessListing;
    isEditable: boolean;
    onChangeAbout?: (about: string) => void;
    onChangeOwnerBio?: (index: number) => (bio: string) => void;
}

function getActionIcon(key) {
    const Icon = Icons[config.actions[key].icon];
    return <Icon />;
}

export function Listing({
    business,
    isEditable,
    onChangeOwnerBio,
    onChangeAbout,
}: IListingProps) {
    return (
        <Grid
            classes={{ root: 'bb-listing' }}
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <section className="bb-listing__section bb-listing__header">
                <div className="bb-listing__header-text">
                    <Typography variant="h2" gutterBottom>
                        {business.name}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        {strings.categories[business.category]}
                    </Typography>
                </div>
                <div className="bb-listing__header-actions">
                    <ButtonGroup
                        classes={{
                            root: 'bb-listing__header-actions-button-group',
                        }}
                        orientation="vertical"
                        color="primary"
                        aria-label="vertical outlined primary button group"
                    >
                        {' '}
                        {['address', 'website', 'phone', 'email'].map((key) => {
                            return (
                                business[key] && (
                                    <ActionButton
                                        label={strings.actions[key]}
                                        icon={getActionIcon(key)}
                                        subLabel={business[key]}
                                    />
                                )
                            );
                        })}
                    </ButtonGroup>
                </div>
            </section>

            <section>
                <Typography variant="h3" gutterBottom>
                    About
                </Typography>
                {isEditable ? (
                    <TextareaAutosize
                        style={{ width: '100%' }}
                        aria-label="about the business"
                        rowsMin={3}
                        onChange={onChangeValue(onChangeAbout)}
                        value={business.about}
                    />
                ) : (
                    <Typography variant="body1" gutterBottom>
                        {business.about}
                    </Typography>
                )}
                {Object.keys(business.identify).map((key) => {
                    const identity = business.identify[key];
                    return (
                        identity.selected && (
                            <div className="bb-listing__identify">
                                <IdentityDisplay
                                    src={identity.image}
                                    label={strings.create.identify[key].label}
                                    text={identity.text}
                                />
                            </div>
                        )
                    );
                })}
            </section>
            <section>
                <Typography variant="h3" gutterBottom>
                    Owners
                </Typography>
                {business.owners.map((owner, index) => {
                    return (
                        <div className="bb-listing__owner">
                            <OwnerBio
                                owner={owner}
                                onChangeOwnerBio={
                                    onChangeOwnerBio && onChangeOwnerBio(index)
                                }
                                isEditable={isEditable}
                            />
                        </div>
                    );
                })}
            </section>
        </Grid>
    );
}
