import { withRouter } from 'react-router-dom';

import { AppBarContainer as AppBarWithoutRouter } from './AppBarContainer';

export const AppBar = withRouter(AppBarWithoutRouter);
