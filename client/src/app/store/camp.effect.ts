import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CampgroundsService } from '../services/campgrounds.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as CampGroundsAction from './camp.action';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CampGroundEffects {
  actions$ = inject(Actions);
  campService = inject(CampgroundsService);
  router = inject(Router);
  toastr = inject(ToastrService);

  constructor() {}

  loadCampGrounds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampGroundsAction.loadCampGrounds), // first action
      mergeMap(() =>
        this.campService.getCampgrounds().pipe(
          // mergemap trigger api call
          map(
            (campgrounds) =>
              CampGroundsAction.loadCampGroundsSuccess({ campgrounds }) // trigger success action
          ),
          catchError(
            (error) => of(CampGroundsAction.loadCampGroundsFailure({ error })) // trigger failure action
          )
        )
      )
    )
  );

updateCampground$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampGroundsAction.updateCampground),
      mergeMap(({ id, campground }) =>
        this.campService.updateCampground(id, campground).pipe(
          map((updatedCampground) => {
            // Show success toastr
            this.toastr.success('Successfully updated!', updatedCampground.title);
            return CampGroundsAction.updateCampgroundSuccess({
              campground: updatedCampground,
            });
          }),
          catchError((error) => {
            console.log(error)
            // Show error toastr
            this.toastr.error(error.error.message, 'Error');
            return of(
              CampGroundsAction.updateCampgroundFailure({
                error: error.message,
              })
            );
          })
        )
      )
    )
  );

  updateCampgroundSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CampGroundsAction.updateCampgroundSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

addCampground$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CampGroundsAction.addCampground),
      mergeMap(({ campground }) =>
        this.campService.createCampground(campground).pipe(
          map((newCampground) => {
            // Show success toastr
            this.toastr.success('Successfully created!', newCampground.title);
            return CampGroundsAction.addCampgroundSuccess({
              campground: newCampground,
            });
          }),
          catchError((error) => {
            // Show error toastr
            this.toastr.error(error.error.message, 'Error');
            return of(CampGroundsAction.addCampgroundFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addCampgroundSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CampGroundsAction.addCampgroundSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
}
