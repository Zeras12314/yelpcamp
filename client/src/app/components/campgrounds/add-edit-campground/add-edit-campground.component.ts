import { Component, inject, OnInit } from '@angular/core';
import { createCampgroundForm } from '../../shared/forms/campground-form';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StoreService } from '../../../store/store.service';
import { Campground } from '../../../models/campground.model';
import { Store } from '@ngrx/store';
import {
  addCampground,
  updateCampground,
} from '../../../store/actions/camp.action';
import { ToastrService } from 'ngx-toastr';
import { filter, take } from 'rxjs';
import { CampgroundsService } from '../../../services/campgrounds.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-edit-campground',
  imports: [ReactiveFormsModule, RouterLink, NgFor],
  templateUrl: './add-edit-campground.component.html',
  styleUrl: './add-edit-campground.component.scss',
})
export class AddEditCampgroundComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);
  storeService = inject(StoreService);
  campService = inject(CampgroundsService);
  toastr = inject(ToastrService);
  store = inject(Store);
  campgroundForm: FormGroup = createCampgroundForm();
  btnLabel: string = '';
  id: string | null = null;
  selectedFiles: File[] = [];

  ngOnInit(): void {
    this.campGroundOnInit();
    console.log('campgroundForm', this.campgroundForm.value);
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
      price: camp.price,
      description: camp.description,
      location: camp.location,
    });

    const imagesArray = this.campgroundForm.get('images') as FormArray;
    imagesArray.clear();

    camp.images.forEach((img) => imagesArray.push(new FormControl(img)));
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      console.log(this.selectedFiles);
    }
  }

  // onSubmit() {
  //   if (this.campgroundForm.invalid) return;
  //   const campground: Campground = this.campgroundForm.value;
  //   console.log('campground: ', campground);
  //   if (this.id) {
  //     // ✅ EXECUTE the updateCampground action here
  //     this.store.dispatch(
  //       updateCampground({
  //         id: this.id,
  //         campground,
  //       })
  //     );
  //   } else {
  //     // ✅ EXECUTE the addCampground action here
  //     this.store.dispatch(addCampground({ campground }));
  //   }
  // }

  onSubmit() {
    // if (this.campgroundForm.invalid) return;

    // Build FormData for upload
    const formData = new FormData();
    Object.entries(this.campgroundForm.value).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(key, value as any);
      }
    });

    this.selectedFiles.forEach((file) => {
      formData.append('image', file); // 👈 SAME KEY NAME
    });

    if (this.id) {
      this.campService.updateCampground(this.id, formData).subscribe({
        next: (res) => console.log('Created:', res),
        error: (err) => console.error('Error:', err),
      });
      // Update existing campground
      // this.store.dispatch(
      //   updateCampground({
      //     id: this.id,
      //     formData,
      //   })
      // );
    } else {
      // Create new campground
      // Send to backend
      this.campService.createCampground(formData).subscribe({
        next: (res) => console.log('Created:', res),
        error: (err) => console.error('Error:', err),
      });
      // console.log('formData: ',formData)
      // this.store.dispatch(
      //   addCampground({
      //     formData,
      //   })
      // );
    }
  }
}
