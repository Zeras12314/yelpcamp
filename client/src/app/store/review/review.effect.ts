import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewService } from '../../services/review.service';
import { ToastrService } from 'ngx-toastr';
import * as ReviewAction from './review.action';
import * as CampGroundsAction from '../camp/camp.action';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()
export class ReviewEffects {
  actions$ = inject(Actions);
  reviewService = inject(ReviewService);
  toastr = inject(ToastrService);
  store = inject(Store);

  createReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewAction.createReview),
      mergeMap(({ id, review }) =>
        this.reviewService.createReview(id, review).pipe(
          map((newReview) =>
            ReviewAction.createReviewSuccess({
              id: id,
              review: newReview,
            })
          ),
          tap(() => {
            this.toastr.success('Review Submitted');
          }),
          catchError((error) =>
            of(
              ReviewAction.createReviewFailure({
                error: error.message || 'Failed to create review',
              })
            )
          )
        )
      )
    )
  );
}
