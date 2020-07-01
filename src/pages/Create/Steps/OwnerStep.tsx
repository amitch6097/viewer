import React from 'react';
import './OwnerStep.less';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { OwnerCard, OwnerCardAdd } from '../../../components/OwnerCard';
import { IOwner } from '../../../../typings/types';
import { strings } from '../../../strings';

export interface IOwnerStepProps {
    onNextStep: () => void;
    onAddOwnerImage: (index: number) => (e: any) => void;
    removeOwner: (index) => () => void;
    onChangeOwnerValue: (
        index: number
    ) => (key: string) => (value: string) => void;
    addOwner: () => void;
    owners: IOwner[];
}

export interface IOwnerStepState {
    errors: Array<{
        name: string;
    }>;
}

export class OwnerStep extends React.Component<
    IOwnerStepProps,
    IOwnerStepState
> {
    state = {
        errors: [
            {
                name: undefined,
            },
        ],
    };

    checkFields = () => {
        const { owners } = this.props;
        let hasErrors = false;

        const errors = Object.values(owners).map((owner) => {
            const name = !Boolean(owner.name);

            if (name) {
                hasErrors = true;
            }

            return {
                name: name ? 'Please Provide a Name' : '',
            };
        });

        this.setState({
            errors,
        });

        if (!hasErrors) {
            this.props.onNextStep();
        }
    };

    render() {
        const { owners } = this.props;
        return (
            <div className="bb-owner-step">
                <Grid
                    classes={{ root: 'bb-owner-step-container' }}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Grid
                        classes={{
                            root: 'bb-owner-step__owners-container',
                        }}
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {' '}
                        <div className="bb-owner-step__owners-container-owner-card">
                            <OwnerCardAdd onAddOwner={this.props.addOwner} />
                        </div>
                        {owners.map((owner, index) => {
                            return (
                                <div className="bb-owner-step__owners-container-owner-card">
                                    <OwnerCard
                                        errors={this.state.errors[index]}
                                        // key={owner.name || index}
                                        owner={owner}
                                        withDelete={owners.length > 1}
                                        removeOwner={this.props.removeOwner(
                                            index
                                        )}
                                        onChangeValue={this.props.onChangeOwnerValue(
                                            index
                                        )}
                                        onAddOwnerImage={this.props.onAddOwnerImage(
                                            index
                                        )}
                                    />
                                </div>
                            );
                        })}
                    </Grid>
                    <Button
                        onClick={this.checkFields}
                        classes={{ root: 'bb-owner-step__continue continue' }}
                        variant="contained"
                        color="primary"
                    >
                        {strings.buttons.continue}
                    </Button>
                </Grid>
            </div>
        );
    }
}
