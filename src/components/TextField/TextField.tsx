import React from 'react';
import './TextField.less';

import TextField_M from '@material-ui/core/TextField';

import { onChangeValue } from '../../helpers';

export interface ITextFieldProps {
    className?: string;
    error?: string;
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
}

export function TextField(props: ITextFieldProps) {
    return (
        <TextField_M
            variant={props.variant}
            classes={{
                root: `bb-text-field ${
                    props.error ? 'bb-text-field--error' : ''
                } ${props.className || ''}`,
            }}
            required={props.required}
            error={Boolean(props.error)}
            helperText={props.error || 'input text'}
            FormHelperTextProps={{
                classes: {
                    root: 'bb-text-field__helper-text',
                },
            }}
            id={props.id}
            key={props.id}
            name={props.id}
            label={props.label}
            value={props.value}
            size="medium"
            onChange={onChangeValue(props.onChange)}
        />
    );
}
