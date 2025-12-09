import { Component, inject, OnInit } from '@angular/core';
import { createCampgroundForm } from '../../shared/forms/campground-form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StoreService } from '../../../store/store.service';
import { Campground } from '../../../models/campground.model';
import { Store } from '@ngrx/store';
import {
  addCampground,
  updateCampground,
} from '../../../store/camp/camp.action';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-add-edit-campground',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-edit-campground.component.html',
  styleUrl: './add-edit-campground.component.scss',
})
export class AddEditCampgroundComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  storeService = inject(StoreService);
  toastr = inject(ToastrService);
  store = inject(Store);
  campgroundForm: FormGroup = createCampgroundForm();
  btnLabel: string = '';
  id: string | null = null;

  ngOnInit(): void {
    this.campGroundOnInit();
  }

  campGroundOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? null;
    this.btnLabel = this.id ? 'Update' : 'Add';

    if (this.id) {
      this.storeService.campGrounds$.pipe(take(1)).subscribe((campgrounds) => {
        // If campgrounds not yet loaded, trigger load
        if (!campgrounds || campgrounds.length === 0) {
          this.storeService.getCampGrounds();

          // Wait for loaded campgrounds and then patch
          this.storeService.campGrounds$
            .pipe(
              filter((c) => c.length > 0),
              take(1)
            )
            .subscribe((loadedCamps) => {
              const camp = loadedCamps.find((c) => c._id === this.id);
              if (camp) this.patchCampForm(camp);
            });

          return;
        }

        // If already loaded, just patch
        const camp = campgrounds.find((c) => c._id === this.id);
        if (camp) this.patchCampForm(camp);
      });
    }
  }

  private patchCampForm(camp: Campground) {
    this.campgroundForm.patchValue({
      title: camp.title,
      image: camp.image,
      price: camp.price,
      description: camp.description,
      location: camp.location,
    });
  }

  onSubmit() {
    if (this.campgroundForm.invalid) return;
    const campground: Campground = this.campgroundForm.value;
    if (this.id) {
      // ✅ EXECUTE the updateCampground action here
      this.store.dispatch(
        updateCampground({
          id: this.id,
          campground,
        })
      );
    } else {
      // ✅ EXECUTE the addCampground action here
      this.store.dispatch(addCampground({ campground }));
    }
  }
}
