import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCampgroundById,
  selectCampGrounds,
  selectLoadCampError,
  selectLoading,
} from './selectors/camp.selector';
import * as CampActions from './actions/camp.action';
import { Observable } from 'rxjs';
import {
  selectReviewLoadingCreate,
  selectReviewLoadingDelete,
} from './selectors/review.selector';
import { Campground } from '../models/campground.model';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private store = inject(Store);

  campGrounds$ = this.store.select(selectCampGrounds);
  error$ = this.store.select(selectLoadCampError);
  loading$ = this.store.select(selectLoading);
  loadingReviewCreate$ = this.store.select(selectReviewLoadingCreate);
  loadingReviewDelete$ = this.store.select(selectReviewLoadingDelete);
  // loading$ = combineLatest([this.store.select(selectLoading)]).pipe(
  //   map(([campLoading]) => campLoading)
  // );

  private initialized = false;
  selectReviewLoadingCreate$: any;

  getCampGrounds() {
    if (!this.initialized) {
      this.store.dispatch(CampActions.loadCampGrounds());
      this.initialized = true; // prevent multiple dispatches
    }
  }

  // 🔥 expose campground by id to any component
  campgroundById(id: string): Observable<Campground | undefined> {
    return this.store.select(selectCampgroundById(id));
  }
}
