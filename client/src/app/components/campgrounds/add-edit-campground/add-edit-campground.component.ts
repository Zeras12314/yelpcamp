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
import { filter, take } from 'rxjs';
import { CampgroundsService } from '../../../services/campgrounds.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-campground',
  imports: [ReactiveFormsModule, RouterLink, AsyncPipe],
  templateUrl: './add-edit-campground.component.html',
  styleUrl: './add-edit-campground.component.scss',
})
export class AddEditCampgroundComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  router = inject(Router);
  storeService = inject(StoreService);
  campService = inject(CampgroundsService);
  store = inject(Store);
  campgroundForm: FormGroup = createCampgroundForm();
  btnLabel: string = '';
  id: string | null = null;
  selectedFiles: File[] = [];
  campImages = [];
  deleteImages: string[] = [];
  loading$ = this.storeService.loading$;
  hasOneImage: boolean = true;
  isImgUploadEmpty: boolean = false;
  showFileUploadValidation: boolean = false;
  campName: string;

  ngOnInit(): void {
    this.campGroundOnInit();
  }

  campGroundOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') ?? null;
    this.btnLabel = this.id ? 'Update' : 'Add';

    if (this.id) {
      this.storeService.campGrounds$.pipe(take(1)).subscribe((campgrounds) => {
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
            this.campName = camp?.title;
            this.campImages = camp?.images;
            this.hasOneImage = camp?.images?.length === 1;
          });

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
    this.isImgUploadEmpty = input.files.length > 0;

    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.campgroundForm.markAsDirty();
      this.showFileUploadValidation = false;
    } else {
      // User cleared the file input
      this.selectedFiles = [];
      this.isImgUploadEmpty = true;
      this.showFileUploadValidation = true; // optional: show validation
      this.campgroundForm.markAsDirty();
    }
  }

  isEmptyImage(): boolean {
    return !this.isImgUploadEmpty && this.hasOneImage;
  }

  onSubmit() {
    // Build FormData for upload
    const formData = new FormData();
    this.processFormData(formData);

    const isValid = this.validateForm(formData);
    const formImg = this.campgroundForm.value['images'];
    const hasCampImg = formImg && formImg.length > 0;
    if (!isValid && !hasCampImg) {
      this.campgroundForm.markAllAsTouched();
      this.showFileUploadValidation = !this.isImgUploadEmpty;
      return;
    }
    this.showFileUploadValidation = false;

    if (this.id) {
      // Update existing campground
      this.store.dispatch(
        updateCampground({
          id: this.id,
          campground: formData,
        })
      );
    } else {
      // Create new campground
      this.store.dispatch(
        addCampground({
          campground: formData,
        })
      );
    }
  }

  processFormData(formData) {
    // 1. Append normal form fields
    Object.entries(this.campgroundForm.value).forEach(([key, value]) => {
      if (key !== 'images') {
        formData.append(key, value as any);
      }
    });
    // 2. Append new uploaded images
    this.selectedFiles.forEach((file) => {
      formData.append('image', file); // 👈 SAME KEY NAME
    });
    // 3. (deleteImages)
    this.deleteImages.forEach((filename) => {
      formData.append('deleteImages', filename);
    });

    return formData;
  }

  validateForm(formData: FormData): boolean {
    for (const [key, value] of formData.entries()) {
      // Strings: must not be empty
      if (typeof value === 'string' && value.trim() === '') {
        return false;
      }

      // Files: must exist and size > 0
      if (value instanceof File && value.size === 0) {
        return false;
      }

      // Other types can be added if needed
    }

    // Extra check: make sure at least one file exists if 'image' key is required
    if (!formData.has('image')) {
      return false;
    }

    return true; // all checks passed
  }

  onDeleteToggle(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.deleteImages.push(checkbox.value);
    } else {
      this.deleteImages = this.deleteImages.filter((v) => v !== checkbox.value);
    }
    this.campgroundForm.markAsDirty();
  }
}
