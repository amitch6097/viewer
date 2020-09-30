import { withRouter } from 'react-router-dom';

import { MyFavorites as MyFavoritesWithoutRouter } from './MyFavorites';

export const MyFavorites = withRouter(MyFavoritesWithoutRouter);
