import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select_M from '@material-ui/core/Select';
import { onChangeValue } from '../../helpers';
import { strings } from '../../strings';

export interface ISelectProps {
    error?: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    className?: string;
    options: Array<{
        id: string;
        label: string;
    }>;
    withNoSelection?: boolean;
}

export function Select(props: ISelectProps) {
    return (
        <FormControl
            variant="outlined"
            className={`bb-select ${props.className ? props.className : ''}`}
            error={Boolean(props.error)}
        >
            <InputLabel id="bb-select__category">{props.label}</InputLabel>
            <Select_M
                labelId="bb-select__category"
                label={props.label}
                value={props.value}
                onChange={onChangeValue(props.onChange)}
                // inputProps={{ 'aria-label': 'Without label' }}
            >
                {props.withNoSelection && (
                    <MenuItem key={'_'} value="">
                        <em>None</em>
                    </MenuItem>
                )}
                {props.options.map((option) => {
                    return (
                        <MenuItem key={option.id || '_'} value={option.id}>
                            {option.label}
                        </MenuItem>
                    );
                })}
            </Select_M>
            {/* <FormHelperText
                style={{
                    visibility: Boolean(props.error) ? 'visible' : 'hidden',
                }}
            >
                {props.error}
            </FormHelperText> */}
        </FormControl>
    );
}
