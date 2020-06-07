import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export function FilterCategory() {
    const data = new Array(5).fill(undefined);
    return (
        <div className="bb-filter-category">
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Expansion Panel 1</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <FormGroup>
                        {data.map(() => {
                            return (
                                <FormControlLabel
                                    control={<Checkbox name="checkedA" />}
                                    label="Secondary"
                                />
                            );
                        })}
                    </FormGroup>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}
