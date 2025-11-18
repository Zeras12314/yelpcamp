import { Component, inject, OnInit } from '@angular/core';
import { createCampgroundForm } from '../../shared/forms/campground-form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../store/store.service';
import { Campground } from '../../../models/campground.model';
import { Store } from '@ngrx/store';
import { addCampground, updateCampground } from '../../../store/camp.action';

@Component({
  selector: 'app-add-edit-campground',
  imports: [ReactiveFormsModule],
  templateUrl: './add-edit-campground.component.html',
  styleUrl: './add-edit-campground.component.scss',
})
export class AddEditCampgroundComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  storeService = inject(StoreService);
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
      this.storeService.campGrounds$.subscribe((campgrounds) => {
        if (!campgrounds || campgrounds.length === 0) {
          // trigger load if data missing (e.g. after refresh)
          this.storeService.getCampGrounds();
          return;
        }

        const camp = campgrounds.find((c) => c._id === this.id);
        if (camp) {
          this.campgroundForm.patchValue({
            title: camp.title,
            image: camp.image,
            price: camp.price,
            description: camp.description,
            location: camp.location,
          });
        }
      });
    }
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
