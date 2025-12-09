import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCampGrounds, selectLoading } from './camp/camp.selector';
import * as CampActions from './camp/camp.action';
import { combineLatest, map } from 'rxjs';
import { selectReviewLoading } from './review/review.selector';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private store = inject(Store);

  campGrounds$ = this.store.select(selectCampGrounds);
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
}
