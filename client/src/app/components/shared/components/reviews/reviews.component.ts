import { Component, inject, Input, input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  createReview,
  deleteReview,
} from '../../../../store/actions/review.action';
import { Campground, Review } from '../../../../models/campground.model';
import { Store } from '@ngrx/store';
import { createReviewForm } from '../../forms/review-form';
import { StoreService } from '../../../../store/store.service';
import { AsyncPipe } from '@angular/common';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-reviews',
  imports: [ReactiveFormsModule, AsyncPipe, LoadingComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  reviewForm: FormGroup = createReviewForm();
  private store = inject(Store);
  private storeService = inject(StoreService);
  campId = input<string>();
  loadingCreate$ = this.storeService.loadingReviewCreate$;
  loadingDelete$ = this.storeService.loadingReviewDelete$;
  loading$ = this.storeService.loading$;

  @Input() campground: Campground;
  currentUserId: string;

  ngOnInit(): void {
    this.storeService.getUser().subscribe((user) => {
      if (user) {
        this.currentUserId = user['_id'];
      }
    });
  }

  submitReview(id: string) {
    const { body, rating } = this.reviewForm.value;
    const review: Review = { body, rating } as Review;
    this.store.dispatch(createReview({ id, review }));
    this.reviewForm.reset();
  }

  deleteReview(reviewId: string) {
    const campId = this.campId();
    console.log('campId', campId);
    if (campId) {
      this.store.dispatch(deleteReview({ campId: campId, reviewId: reviewId }));
    }
  }
}
