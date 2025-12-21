import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

export function createCampgroundForm(): FormGroup {
  return new FormGroup({
    title: new FormControl('', Validators.required),
    images: new FormArray([], Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
}
