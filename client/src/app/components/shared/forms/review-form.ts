import { FormGroup, FormControl, Validators } from '@angular/forms';

export function createReviewForm(): FormGroup {
  return new FormGroup({
    body: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
  });
}
