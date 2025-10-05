import { createAction, props } from '@ngrx/store';
import { Campground } from '../models/campground.model';

export const loadCampGrounds = createAction('[Campgrounds] Load Campgrounds');

export const loadCampGroundsSuccess = createAction(
  '[Campgrounds] Load Campgrounds Success',
  props<{ campgrounds: Campground[] }>()
);

export const loadCampGroundsFailure = createAction(
  '[Campgrounds] Load Campgrounds Failure',
  props<{ error: any }>()
);
