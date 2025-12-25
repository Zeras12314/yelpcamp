import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Campground } from '../../models/campground.model';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, tap } from 'rxjs';
import { AsyncPipe, NgClass } from '@angular/common';
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
import { selectCampgroundById } from '../../store/selectors/camp.selector';
import { loadCampgroundById } from '../../store/actions/camp.action';
import { StoreService } from '../../store/store.service';
import { ReviewsComponent } from '../shared/components/reviews/reviews.component';
import { CampgroundMapComponent } from '../shared/components/campground-map/campground-map.component';

@Component({
  selector: 'app-campground-details',
  imports: [
    AsyncPipe,
    MaterialElementsModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    ReviewsComponent,
    NgClass,
    CampgroundMapComponent,
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
  campId = signal(this.activatedRoute.snapshot.paramMap.get('id'));
  // campground$!: Observable<Campground | undefined>;
  campground$!: Observable<any>;
  loading$ = this.storeService.loading$;
  imageLoading = true;
  currentUserId: string;
  campAuthorId: string;
  isCampOwner: boolean = false;
  daysAgo: number;

  ngOnInit() {
    this.store.dispatch(loadCampgroundById({ id: this.campId() }));
    this.storeService.getUser().subscribe((user) => {
      if (user) {
        this.currentUserId = user['_id'];
      }
    });
    this.campground$ = this.store
      .select(selectCampgroundById(this.campId()))
      .pipe(
        filter(Boolean),
        tap((camp) => {
          this.campAuthorId = camp?.author?._id;
          this.isCampOwner = this.campAuthorId === this.currentUserId;
        })
      );
    this.daysAgo = this.randomDays();
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

  randomDays() {
    return Math.floor(Math.random() * 100);
  }
}
