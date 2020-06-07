import React from 'react';

import './ExpandCheckbox.less';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface IExpandCheckboxProps {
    label: string;
    children: any;
}

export function ExpandCheckbox(props: IExpandCheckboxProps) {
    return (
        <div className="bb-expand-checkbox">
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<Checkbox />}
                    aria-label="Expand"
                >
                    <Typography>{props.label}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>{props.children}</ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
