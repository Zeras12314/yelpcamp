import { createReducer, on } from '@ngrx/store';
import { Campground } from '../models/campground.model';
import {
  addCampgroundSuccess,
  loadCampGrounds,
  loadCampGroundsSuccess,
  updateCampground,
  updateCampgroundFailure,
  updateCampgroundSuccess,
} from './camp.action';

export interface CampGroundState {
  campgrounds: Campground[];
  loading: boolean;
}

export const initialState: CampGroundState = {
  campgrounds: [],
  loading: false,
};

export const campGroundsReducer = createReducer(
  initialState,
  on(loadCampGrounds, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadCampGroundsSuccess, (state, { campgrounds }) => ({
    ...state,
    campgrounds,
    loading: false,
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
  }))
);
