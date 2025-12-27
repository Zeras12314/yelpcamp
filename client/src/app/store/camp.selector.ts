import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampGroundState } from './camp.reducer';

// type of data expcting from the store
// param should be similar to props inside action
export const selectCampGroundsState =
  createFeatureSelector<CampGroundState>('campgrounds');

export const selectCampGrounds = createSelector(
  // the selector itself
  selectCampGroundsState,
  (state) => state.campgrounds
);

export const selectLoading = createSelector(
  selectCampGroundsState,
  (state) => state.loading
);
