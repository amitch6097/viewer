import React from 'react';

import './InputGroup.less';

export interface InputGroupProps {
    label: string;
    children: any;
}

export function InputGroup(props: InputGroupProps) {
    return (
        <div className="bb-input-group">
            <h3>{props.label}</h3>
            {props.children}
        </div>
    );
}
