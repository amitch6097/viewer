export { CreateReviewView } from './CreateReviewView';

import { withRouter } from 'react-router-dom';

import { CreateReview as CreateReviewWithoutRouter } from './CreateReview';

export const CreateReview = withRouter(CreateReviewWithoutRouter);
