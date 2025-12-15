import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
} from '@angular/forms';

export function userLoginForm(): FormGroup {
  return new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
}

export function userRegisterForm(): FormGroup {
  return new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
