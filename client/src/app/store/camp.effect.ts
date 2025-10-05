import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CampgroundsService } from '../services/campgrounds.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import * as CampGroundsAction from './camp.action';

@Injectable()
export class CampGroundEffects {
  actions$ = inject(Actions);
  campService = inject(CampgroundsService);

  constructor() {}

  loadCampGrounds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampGroundsAction.loadCampGrounds), // first action
      mergeMap(() => 
        this.campService.getCampgrounds().pipe( // mergemap trigger api call
          map((campgrounds) => 
            CampGroundsAction.loadCampGroundsSuccess({ campgrounds }) // trigger success action
          ),
          catchError((error) =>
            of(CampGroundsAction.loadCampGroundsFailure({ error })) // trigger failure action 
          )
        )
      )
    )
  );
}
