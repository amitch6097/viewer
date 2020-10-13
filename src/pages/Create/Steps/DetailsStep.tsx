import React from 'react';
import './DetailsStep.less';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { IBusinessListing } from '../../../../typings/types';
import { onChangeValue } from '../../../helpers';
import { strings } from '../../../strings';
import { config } from '../../../config';

import { OwnerBio } from '../../../components/OwnerBio';
import { Listing } from '../../../components/Listing';

export interface IDetailsStepProps {
    business: IBusinessListing;
    creating: boolean;
    onChangeAbout: (about: string) => void;
    onChangeOwnerBio: (index: number) => (bio: string) => void;
    onNextStep: () => void;
}

export class DetailsStep extends React.Component<IDetailsStepProps> {
    checkFields = () => {
        this.props.onNextStep();
    };

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
                    <Listing
                        id={undefined}
                        business={business}
                        isEditMode={true}
                        onChangeOwnerBio={this.props.onChangeOwnerBio}
                        onChangeAbout={this.props.onChangeAbout}
                        isFavorited={false}
                        onToggleFavorite={console.log}
                    />
                    <Button
                        onClick={this.checkFields}
                        classes={{
                            root: 'bb-details-step__continue continue',
                        }}
                        variant="contained"
                        color="primary"
                    >
                        {this.props.creating ? (
                            <CircularProgress />
                        ) : (
                            strings.buttons.createListing
                        )}
                    </Button>
                    {this.props.creating && <CircularProgress />}
                </Grid>
            </div>
        );
    }
}
