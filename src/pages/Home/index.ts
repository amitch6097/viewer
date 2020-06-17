import { withRouter } from 'react-router-dom';

import { Home as HomeWithoutRouter } from './Home';

export const Home = withRouter(HomeWithoutRouter);
