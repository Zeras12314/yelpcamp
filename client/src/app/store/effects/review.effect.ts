import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewService } from '../../services/review.service';
import * as ReviewAction from '../actions/review.action';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { MessagesService } from '../../services/message.service';

@Injectable()
export class ReviewEffects {
  actions$ = inject(Actions);
  reviewService = inject(ReviewService);
  messageService = inject(MessagesService);
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
            this.messageService.showSuccess('Review Submitted')
          }),
          catchError((error) => {
            this.messageService.showError(error.error.message)
            return of(
              ReviewAction.createReviewFailure({
                error: error.message || 'Failed to create review',
              })
            );
          })
        )
      )
    )
  );

  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewAction.deleteReview),
      mergeMap(({ campId, reviewId }) =>
        this.reviewService.deleteReview(campId, reviewId).pipe(
          map(() => ReviewAction.deleteReviewSuccess({ campId, reviewId })),
          tap(() => this.messageService.showSuccess('Successfully Delete')),
          catchError((error) => {
             this.messageService.showSuccess(error.error?.message || 'Error', 'Error')
            return of(ReviewAction.deleteReviewFailure({ error }));
          })
        )
      )
    )
  );
}
