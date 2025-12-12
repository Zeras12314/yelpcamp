import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { Campground, Review } from '../../models/campground.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  take,
} from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MaterialElementsModule } from '../shared/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogPopComponent } from '../shared/components/dialog-pop/dialog-pop.component';
import {
  FormGroup,
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { createReviewForm } from '../shared/forms/review-form';
import { Store } from '@ngrx/store';
import { createReview, deleteReview } from '../../store/review/review.action';
import { selectCampgroundById } from '../../store/camp/camp.selector';
import { loadCampgroundById } from '../../store/camp/camp.action';
import { StoreService } from '../../store/store.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { ReviewService } from '../../services/review.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReviewsComponent } from '../shared/components/reviews/reviews.component';

@Component({
  selector: 'app-campground-details',
  imports: [
    AsyncPipe,
    MaterialElementsModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    LoadingComponent, ReviewsComponent
  ],
  templateUrl: './campground-details.component.html',
  styleUrls: ['./campground-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampgroundDetailsComponent implements OnInit {
  reviewForm: FormGroup = createReviewForm();
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private store = inject(Store);
  private storeService = inject(StoreService);

  // campId!: string;
  campId = toSignal(
    this.activatedRoute.paramMap.pipe(map((params) => params.get('id')!)),
    { initialValue: '' } // ✅ initialValue is valid here
  );
  campground$!: Observable<Campground | undefined>;
  loading$ = this.storeService.loading$;
  imageLoading = true;

  ngOnInit() {
    this.campId = signal(this.activatedRoute.snapshot.paramMap.get('id')!);
    this.store.dispatch(loadCampgroundById({ id: this.campId() }));

    // Subscribe to real-time changes from the store
    this.campground$ = this.store.select(selectCampgroundById(this.campId()));
  }

  openDialog(id: string) {
    this.dialog.open(DialogPopComponent, {
      data: {
        id,
        action: 'delete',
      },
    });
  }

  editCampground(id: string) {
    this.router.navigate(['/campgrounds', id, 'edit']);
  }

//   submitReview(id: string) {
//     const { body, rating } = this.reviewForm.value;
//     const review: Review = { body, rating } as Review;
//     this.store.dispatch(createReview({ id, review }));
//     // Optional: reset form
//     this.reviewForm.reset();
//   }
// 
//   deleteReview(reviewId: string) {
//     this.store.dispatch(
//       deleteReview({ campId: this.campId(), reviewId: reviewId })
//     );
//   }
}
