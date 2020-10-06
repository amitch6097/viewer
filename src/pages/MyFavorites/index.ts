import { withRouter } from 'react-router-dom';

import { MyFavorites as MyFavoritesWithoutRouter } from './MyFavorites';

export const MyFavorites = withRouter(MyFavoritesWithoutRouter);
export { MyFavoriteBusinessesView } from './MyFavoriteBusinessesView';

export { MyFavoritesContainer } from './MyFavoritesContainer';

export { MyFavoritesView } from './MyFavoritesView';
