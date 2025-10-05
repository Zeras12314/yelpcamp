import { createReducer, on } from '@ngrx/store';
import { Campground } from '../models/campground.model';
import { loadCampGrounds, loadCampGroundsSuccess } from './camp.action';

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
  }))
);
