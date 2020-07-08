import React from 'react';
import './DetailsStep.less';

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
import { SearchInput } from '../../../components/SearchInput';

export interface IDetailsStepProps {
    onStartCreate: (businessName: string) => void;
}

export class CheckExistsStep extends React.Component<IDetailsStepProps> {
    searchRef: React.RefObject<unknown>;

    constructor(props) {
        super(props);
        this.searchRef = React.createRef();
    }

    onContinueClicked = () => {
        //@ts-ignore
        this.props.onStartCreate(this.searchRef.current.value);
    };

    render() {
        return (
            <div className="bb-check-exists-step">
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <SearchInput searchRef={this.searchRef} />
                    <Button
                        classes={{
                            root: 'bb-check-exists-step__continue continue',
                        }}
                        variant="contained"
                        color="primary"
                        onClick={this.onContinueClicked}
                    >
                        {strings.buttons.continue}
                    </Button>
                </Grid>
            </div>
        );
    }
}
