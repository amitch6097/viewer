import React from 'react';
import { AppBar } from '../../src/components/AppBar/AppBar';
import { DesktopPopup, MobilePopup, Popup } from '../../src/components/Popup';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

export default {
    title: 'Components|Popup',
    component: DesktopPopup,
    decorators: [withKnobs],
};

export const PopupStory = () => {
    return (
        <Popup label={'My Pop Up'}>
            <div
                style={{
                    background: 'purple',
                    height: '100px'
                }}
            >
                Content
            </div>
        </Popup>
    );
};

export const DesktopPopupStory = () => {
    return (
        <DesktopPopup label={'My Pop Up'}>
            <div
                style={{
                    background: 'purple',
                    height: '100px'
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
                    height: '100px'
                }}
            >
                Content
            </div>
        </MobilePopup>
    );
};