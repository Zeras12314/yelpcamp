import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CampGroundState } from '../reducers/camp.reducer';

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

export const selectLoadCampError = createSelector(
  selectCampGroundsState,
  (state) => state.error
);

export const selectCampgroundById = (id: string) =>
  createSelector(selectCampGroundsState, (state) =>
    state.campgrounds.find((c) => c._id === id)
  );
