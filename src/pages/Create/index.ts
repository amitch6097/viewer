import { withRouter } from 'react-router-dom';
import { Create as CreateWithoutRouter } from './Create';

export const Create = withRouter(CreateWithoutRouter);
