import React from 'react';
import './DetailsStep.less';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { IBusinessListing } from '../../../../typings/types';
import { onChangeValue } from '../../../helpers';
import { strings } from '../../../strings';
import { config } from '../../../config';
import * as Icons from '@material-ui/icons';

import Avatar from '@material-ui/core/Avatar';

import { OwnerBio } from '../../../components/OwnerBio';
import { IdentityDisplay } from '../../../components/IdentityDisplay';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { ActionButton } from 'src/components/ActionButton';

export interface IDetailsStepProps {
    business: IBusinessListing;
    onChangeAbout: (about: string) => void;
    onChangeOwnerBio: (index: number) => (bio: string) => void;
}

function getActionIcon(key) {
    const Icon = Icons[config.actions[key].icon];
    return <Icon />;
}

export class DetailsStep extends React.Component<IDetailsStepProps> {
    static Label() {
        return 'Fill in the Details';
    }

    render() {
        const { business } = this.props;
        return (
            <div className="bb-details-step">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <section className="bb-details-step__section bb-details-step__header">
                        <div className="bb-details-step__header-text">
                            <Typography variant="h2" gutterBottom>
                                {business.name}
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                {business.category}
                            </Typography>
                        </div>
                        <div className="bb-details-step__header-actions">
                            <ButtonGroup
                                orientation="vertical"
                                color="primary"
                                aria-label="vertical outlined primary button group"
                            >
                                {' '}
                                {['address', 'website', 'phone', 'email'].map(
                                    key => {
                                        return (
                                            business[key] && (
                                                <ActionButton
                                                    label={strings.actions[key]}
                                                    icon={getActionIcon(key)}
                                                    subLabel={business[key]}
                                                />
                                            )
                                        );
                                    }
                                )}
                            </ButtonGroup>
                        </div>
                    </section>

                    <section>
                        <Typography variant="h3" gutterBottom>
                            About
                        </Typography>
                        <TextareaAutosize
                            style={{ width: '100%' }}
                            aria-label="about the business"
                            rowsMin={3}
                            onChange={onChangeValue(this.props.onChangeAbout)}
                            value={business.about}
                        />
                        {Object.keys(business.identify).map(key => {
                            const identity = business.identify[key];
                            return (
                                identity.selected && (
                                    <div className="bb-details-step__identify">
                                        <IdentityDisplay
                                            src={identity.image}
                                            label={
                                                strings.create.identify[key]
                                                    .label
                                            }
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
                                <div className="bb-details-step__owner">
                                    <OwnerBio
                                        owner={owner}
                                        onChangeOwnerBio={this.props.onChangeOwnerBio(
                                            index
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </section>
                </Grid>
            </div>
        );
    }
}
