import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';

import { MobilePopup } from './MobilePopup';
import { DesktopPopup } from './DesktopPopup';

export function Popup(props) {
    return (
        <Container>
            <Hidden smUp>
                <MobilePopup {...props} />
            </Hidden>
            <Hidden xsDown>
                <DesktopPopup {...props} />
            </Hidden>
        </Container>
    );
}
