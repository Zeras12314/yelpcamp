import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCampGrounds, selectLoading } from './camp.selector';
import * as CampActions from '../store/camp.action';

@Injectable({ providedIn: 'root' })
export class StoreService {
  private store = inject(Store);

  campGrounds$ = this.store.select(selectCampGrounds);
  loading$ = this.store.select(selectLoading);

  private initialized = false;

  getCampGrounds() {
    if (!this.initialized) {
      this.store.dispatch(CampActions.loadCampGrounds());
      this.initialized = true; // prevent multiple dispatches
    }
  }
}
