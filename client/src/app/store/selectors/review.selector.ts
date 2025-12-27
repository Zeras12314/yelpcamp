import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

// 1. Select the review feature from the store
export const selectReviewState = (state: AppState) => state.review;

// 2. Select loading (for spinner UI)
export const selectReviewLoadingCreate = createSelector(
  selectReviewState,
  (state) => state.loadingCreate
);

export const selectReviewLoadingDelete = createSelector(
  selectReviewState,
  (state) => state.loadingDelete
);

// 3. Select error (optional)
export const selectReviewError = createSelector(
  selectReviewState,
  (state) => state.error
);
