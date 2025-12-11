import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectCampgroundById,
  selectCampGrounds,
  selectLoadCampError,
  selectLoading,
} from './camp/camp.selector';
import * as CampActions from './camp/camp.action';
import { combineLatest, map, Observable } from 'rxjs';
import { selectReviewLoading } from './review/review.selector';
import { Campground } from '../models/campground.model';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private store = inject(Store);

  campGrounds$ = this.store.select(selectCampGrounds);
  error$ = this.store.select(selectLoadCampError);
  loading$ = combineLatest([
    this.store.select(selectLoading),
    this.store.select(selectReviewLoading),
  ]).pipe(map(([campLoading, reviewLoading]) => campLoading || reviewLoading));

  private initialized = false;

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
