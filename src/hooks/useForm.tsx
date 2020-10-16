import { ExecOptionsWithStringEncoding } from 'child_process';
import React from 'react';

export interface IFormItem {
    value: any;
    label?: string;
    required?: boolean;
    error?: boolean;
    errorString?: string;
    hasError?: (state: Record<string, IFormItem>, key: string) => boolean;
}

export function useForm(
    initialState: Record<string, IFormItem>,
    onSubmitComplete: (state: Record<string, IFormItem['value']>) => void
) {
    const [state, setState] = React.useState(initialState);

    const updateValue = (key: string, value: any) => {
        setState({
            ...state,
            [key]: {
                ...state[key],
                value,
            },
        });
    };

    const onSubmit = () => {
        let hasErrors = false;
        const errorState = Object.keys(state).reduce(
            (__, key) => {
                const { required, value, label, hasError } = __[key];
                let hasErrorValue = false;
                if (hasError) {
                    hasErrorValue = hasError(state, key);
                } else if (required && !value) {
                    hasErrorValue = true;
                } else {
                    hasErrorValue = false
                }
                __[key] = {
                    ...__[key],
                    error: hasErrorValue,
                };
                hasErrors = hasErrors || hasErrorValue;
                return __;
            },
            { ...state }
        );

        if (hasErrors) {
            setState(errorState);
        } else {
            const values = Object.keys(state).reduce((__, key) => {
                __[key] = state[key].value;
                return __;
            }, {}) as Record<string, IFormItem['value']>;
            onSubmitComplete(values);
        }
    };

    return { onSubmit, state, updateValue, setState };
}
