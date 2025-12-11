import { createReducer, on } from '@ngrx/store';
import {
  createReview,
  createReviewFailure,
  createReviewSuccess,
  deleteReview,
  deleteReviewFailure,
  deleteReviewSuccess,
} from './review.action';

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
  on(createReview, (state) => ({ ...state, loading: true })),
  on(createReviewSuccess, (state) => ({ ...state, loading: false })),
  on(createReviewFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(deleteReview, (state) => ({ ...state, loading: true })),
  on(deleteReviewSuccess, (state) => ({ ...state, loading: false })),
  on(deleteReviewFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
