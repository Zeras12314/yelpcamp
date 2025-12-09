import { createAction, props } from '@ngrx/store';
import { Review } from '../../models/campground.model';

export const createReview = createAction(
  '[Review] Create Review',
  props<{ id: string; review: Review }>()
);

export const createReviewSuccess = createAction(
  '[Review] Create Review Success',
  props<{ id: string; review: Review }>()
);

export const createReviewFailure = createAction(
  '[Review] Create Review Failure',
  props<{ error: string }>()
);