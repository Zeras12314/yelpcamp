import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { userRegisterForm } from '../../shared/forms/user-form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../../../store/actions/user.action';
import { AsyncPipe } from '@angular/common';
import { StoreService } from '../../../store/store.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  userService = inject(UserService);
  store = inject(Store);
  userRegisterForm: FormGroup = userRegisterForm();
  storeService = inject(StoreService);
  loadingAuth$ = this.storeService.loadingAuth$;

  register() {
    const { email, username, password } = this.userRegisterForm.value;
    this.store.dispatch(
      register({ username: username, password: password, email: email })
    );
  }
}
