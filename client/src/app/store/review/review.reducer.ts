import { createReducer, on } from '@ngrx/store';
import { createReview, createReviewFailure, createReviewSuccess } from './review.action';

export interface ReviewState {
  loading: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  loading: false,
  error: null,
};

export const reviewReducer = createReducer(
  initialState,

  on(createReview, (state) => ({
    ...state,
    loading: true,
  })),

  on(createReviewSuccess, (state) => ({
    ...state,
    loading: false,
  })),

  on(createReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
