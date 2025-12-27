import { FormGroup, FormControl, Validators } from '@angular/forms';

export function createCampgroundForm(): FormGroup {
  return new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
  });
}
