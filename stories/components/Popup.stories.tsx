import React from 'react';
import { AppBar } from '../../src/components/AppBar/AppBar';
import { DesktopPopup, MobilePopup } from '../../src/components/Popup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Popup',
    component: DesktopPopup,
    decorators: [withKnobs],
};

export const DesktopPopupStory = () => {
    return (
        <DesktopPopup label={'My Pop Up'}>
            <div
                style={{
                    background: 'purple',
                }}
            >
                Content
            </div>
        </DesktopPopup>
    );
};

export const MobilePopupStory = () => {
    return (
        <MobilePopup label={'My Pop Up'}>
            <div
                style={{
                    background: 'purple',
                }}
            >
                Content
            </div>
        </MobilePopup>
    );
};