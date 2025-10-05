import { FormGroup, FormControl } from '@angular/forms';

export function createCampgroundForm(): FormGroup {
  return new FormGroup({
    title: new FormControl(''),
    image: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl('')
  });
}
