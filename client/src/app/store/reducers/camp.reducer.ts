import { createReducer, on } from '@ngrx/store';
import { Campground } from '../../models/campground.model';
import {
  addCampgroundSuccess,
  loadCampgroundByIdSuccess,
  loadCampGrounds,
  loadCampGroundsFailure,
  loadCampGroundsSuccess,
  updateCampground,
  updateCampgroundFailure,
  updateCampgroundSuccess,
} from '../actions/camp.action';
import {
  createReviewSuccess,
  deleteReviewSuccess,
} from '../actions/review.action';

export interface CampGroundState {
  campgrounds: Campground[];
  loading: boolean;
  error: any | null;
}

export const initialState: CampGroundState = {
  campgrounds: [],
  loading: false,
  error: null,
};

export const campGroundsReducer = createReducer(
  initialState,
  on(loadCampGrounds, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadCampGroundsSuccess, (state, { campgrounds }) => ({
    ...state,
    campgrounds,
    loading: false,
    error: null,
  })),
  on(loadCampGroundsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(updateCampground, (state) => ({
    ...state,
    loading: true,
  })),
  on(updateCampgroundSuccess, (state, { campground }) => ({
    ...state,
    campgrounds: state.campgrounds.map((camp) =>
      camp._id === campground._id ? campground : camp
    ),
    loading: false,
  })),
  on(updateCampgroundFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(addCampgroundSuccess, (state, { campground }) => ({
    ...state,
    campgrounds: [...state.campgrounds, campground],
  })),
  on(loadCampgroundByIdSuccess, (state, { campground }) => ({
    ...state,
    campgrounds: state.campgrounds.some((c) => c._id === campground._id)
      ? state.campgrounds.map((c) =>
          c._id === campground._id ? campground : c
        )
      : [...state.campgrounds, campground],
  })),
  on(createReviewSuccess, (state, { id, review }) => ({
    ...state,
    campgrounds: state.campgrounds.map((camp) =>
      camp._id === id
        ? { ...camp, reviews: [...(camp.reviews || []), review] }
        : camp
    ),
    loading: false,
  })),
  on(deleteReviewSuccess, (state, { campId, reviewId }) => ({
    ...state,
    campgrounds: state.campgrounds.map((camp) =>
      camp._id === campId
        ? { ...camp, reviews: camp.reviews.filter((r) => r._id !== reviewId) }
        : camp
    ),
    loading: false,
  }))
);
