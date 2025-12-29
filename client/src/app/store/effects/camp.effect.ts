import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CampgroundsService } from '../../services/campgrounds.service';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  loadCampGrounds,
  loadCampGroundsFailure,
  loadCampGroundsSuccess,
  updateCampground,
  updateCampgroundFailure,
  updateCampgroundSuccess,
  addCampground,
  addCampgroundFailure,
  addCampgroundSuccess,
  deleteCampground,
  deleteCampgroundFailure,
  loadCampgroundById,
  loadCampgroundByIdSuccess,
  deleteCampgroundSuccess,
} from '../actions/camp.action';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

@Injectable()
export class CampGroundEffects {
  actions$ = inject(Actions);
  campService = inject(CampgroundsService);
  router = inject(Router);
  toastr = inject(ToastrService);
  store = inject(Store);

  constructor() {}

  loadCampGrounds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCampGrounds), // first action
      mergeMap(() =>
        this.campService.getCampgrounds().pipe(
          // mergemap trigger api call
          map(
            (campgrounds) => loadCampGroundsSuccess({ campgrounds }) // trigger success action
          ),
          catchError(
            (error) => of(loadCampGroundsFailure({ error })) // trigger failure action
          )
        )
      )
    )
  );

  updateCampground$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCampground),
      concatMap(({ id, campground }) => {
        // API call
        return this.campService.updateCampground(id, campground).pipe(
          map((updatedCampground) => {
            this.toastr.success(
              'Successfully updated!',
              updatedCampground.title
            );

            return updateCampgroundSuccess({
              campground: updatedCampground,
            });
          }),
          catchError((error) => {
            this.toastr.error(
              error?.error?.message ?? 'Update failed',
              'Error'
            );

            return of(
              updateCampgroundFailure({
                error: error.message,
              })
            );
          })
        );
      })
    )
  );

  updateCampgroundSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateCampgroundSuccess),
        tap(({ campground }) => {
          this.router.navigate([`/campground-details/${campground._id}`]);
        })
      ),
    { dispatch: false }
  );

  addCampground$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCampground),
      concatMap(({ campground }) =>
        this.campService.createCampground(campground).pipe(
          map((newCampground) => {
            // Show success toastr
            this.toastr.success('Successfully created!', newCampground.title);
            return addCampgroundSuccess({
              campground: newCampground,
            });
          }),
          catchError((error) => {
            // Show error toastr
            this.toastr.error(error.error.message, 'Error');
            return of(addCampgroundFailure({ error: error.message }));
          })
        )
      )
    )
  );

  addCampgroundSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addCampgroundSuccess),
        tap(({ campground }) => {
          this.router.navigate([`/campground-details/${campground._id}`]);
          // this.router.navigate(['/campgrounds']);
        })
      ),
    { dispatch: false }
  );

  deleteCampground$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCampground),
      concatMap(({ id }) =>
        this.campService.deleteCampground(id).pipe(
          tap(() => {
            this.toastr.success('Campground deleted successfully');
          }),
          mergeMap(() => [
            deleteCampgroundSuccess({ id }),
            loadCampGrounds(), // triggers load effect
          ]),
          catchError((error) => {
            this.toastr.error(error.error.message, 'Error');
            return of(deleteCampgroundFailure({ error }));
          })
        )
      )
    )
  );

  deleteCampgroundSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCampgroundSuccess),
        tap(() => this.router.navigate(['/campgrounds']))
      ),
    { dispatch: false }
  );

  loadCampgroundById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCampgroundById),
      switchMap(({ id }) =>
        this.campService.getCampground(id).pipe(
          map((campground) => loadCampgroundByIdSuccess({ campground })),
          catchError((error) => of(loadCampGroundsFailure({ error })))
        )
      )
    )
  );
}
