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
  loadingCreate: boolean;
  loadingDelete: boolean;
  error: string | null;
}

const initialState: ReviewState = {
  loadingCreate: false,
  loadingDelete: false,
  error: null,
};

export const reviewReducer = createReducer(
  initialState,
  on(createReview, (state) => ({ ...state, loadingCreate: true })),
  on(createReviewSuccess, (state) => ({ ...state, loadingCreate: false })),
  on(createReviewFailure, (state, { error }) => ({
    ...state,
    loadingCreate: false,
    error,
  })),
  on(deleteReview, (state) => ({ ...state, loadingDelete: true })),
  on(deleteReviewSuccess, (state) => ({ ...state, loadingDelete: false })),
  on(deleteReviewFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
