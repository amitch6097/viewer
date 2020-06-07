import React from 'react';
import './Create.less';

import { AppBar } from '../../components/AppBar';
import { InputGroup } from '../../components/InputGroup';
import { ExpandCheckbox } from '../../components/ExpandCheckbox';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export function Create() {
    const data = new Array(5).fill(undefined);
    return (
        <div className="bb-pages bb-pages-create">
            <AppBar />
            <div className="bb-pages-create__content">
                <TextField
                    required
                    id="outlined-required"
                    label="Business Name"
                    variant="outlined"
                />
                About
                <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Empty"
                    rowsMin={3}
                />
                <InputGroup label="Business Owner(s)">
                    <TextField
                        required
                        id="outlined-required"
                        label="First Name"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Last Name"
                        variant="outlined"
                    />
                </InputGroup>
                <InputGroup label="Business Contact">
                    <TextField
                        required
                        id="outlined-required"
                        label="Phone Number"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined"
                        label="Business Email"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined"
                        label="Website"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Category"
                        variant="outlined"
                    />
                </InputGroup>
                <InputGroup label="Business Address">
                    <FormControlLabel
                        control={<Checkbox name="checkedA" />}
                        label="This is an Online Business"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Street Address"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Street Address 2"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="City"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="State"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Zip Code"
                        variant="outlined"
                    />
                </InputGroup>
                <InputGroup label="Identify Your Business">
                    <ExpandCheckbox label="This is a Minority Owned Business">
                        <h3>Tell us more!</h3>
                        <p>
                            Our users love to here more about the Businesses
                            they are supporting
                        </p>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Empty"
                            rowsMin={3}
                        />
                    </ExpandCheckbox>
                    <ExpandCheckbox label="This is a Female Owned Business">
                        <h3>Tell us more!</h3>
                        <p>
                            Our users love to here more about the Businesses
                            they are supporting
                        </p>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Empty"
                            rowsMin={3}
                        />
                    </ExpandCheckbox>
                </InputGroup>
            </div>
        </div>
    );
}
