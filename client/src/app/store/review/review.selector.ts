import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

// 1. Select the review feature from the store
export const selectReviewState = (state: AppState) => state.review;

// 2. Select loading (for spinner UI)
export const selectReviewLoading = createSelector(
  selectReviewState,
  (state) => state.loading
);

// 3. Select error (optional)
export const selectReviewError = createSelector(
  selectReviewState,
  (state) => state.error
);
