import { createAction, props } from '@ngrx/store';
import { Campground } from '../../models/campground.model';

export const loadCampGrounds = createAction('[Campgrounds] Load Campgrounds');

export const loadCampGroundsSuccess = createAction(
  '[Campgrounds] Load Campgrounds Success',
  props<{ campgrounds: Campground[] }>()
);

export const loadCampGroundsFailure = createAction(
  '[Campgrounds] Load Campgrounds Failure',
  props<{ error: any }>()
);

export const updateCampground = createAction(
  '[Campgrounds] Update Campground',
  props<{ id: string; campground: any }>()
);

export const updateCampgroundSuccess = createAction(
  '[Campgrounds] Update Campground Success',
  props<{ campground: Campground }>()
);

export const updateCampgroundFailure = createAction(
  '[Campgrounds] Update Campground Failure',
  props<{ error: any }>()
);

export const addCampground = createAction(
  '[Campground] Add Campground',
  props<{ campground: any }>()
);

export const addCampgroundSuccess = createAction(
  '[Campground] Add Campground Success',
  props<{ campground: Campground }>()
);

export const addCampgroundFailure = createAction(
  '[Campground] Add Campground Failure',
  props<{ error: any }>()
);

export const deleteCampground = createAction(
  '[Campground] Delete Campground',
  props<{ id: string }>()
);

export const deleteCampgroundSuccess = createAction(
  '[Campground] Delete Campground Success',
  props<{ id: string }>()
);

export const deleteCampgroundFailure = createAction(
  '[Campground] Delete Campground Failure',
  props<{ error: any }>()
);

export const loadCampgroundById = createAction(
  '[Campground] Load Campground By ID',
  props<{ id: string }>()
);

export const loadCampgroundByIdSuccess = createAction(
  '[Campground] Load Campground By ID Success',
  props<{ campground: Campground }>()
);

export const loadCampgroundByIdFailure = createAction(
  '[Campground] Load Campground By ID Failure',
  props<{ error: any }>()
);

export const sortCampgrounds = createAction(
  '[Campgrounds] Sort',
  props<{ sortBy: keyof Campground; direction?: 'asc' | 'desc' }>()
);
