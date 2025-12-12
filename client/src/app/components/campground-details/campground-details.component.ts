import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Campground, } from '../../models/campground.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  map,
  Observable,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
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
import { selectCampgroundById } from '../../store/camp/camp.selector';
import { loadCampgroundById } from '../../store/camp/camp.action';
import { StoreService } from '../../store/store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReviewsComponent } from '../shared/components/reviews/reviews.component';

@Component({
  selector: 'app-campground-details',
  imports: [
    AsyncPipe,
    MaterialElementsModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    ReviewsComponent
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
}
