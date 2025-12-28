import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { userLoginForm } from '../../shared/forms/user-form';
import { Store } from '@ngrx/store';
import { login } from '../../../store/actions/user.action';
import { StoreService } from '../../../store/store.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userLoginForm: FormGroup = userLoginForm();
  userService = inject(UserService);
  storeService = inject(StoreService);
  store = inject(Store);
  loadingAuth$ = this.storeService.loadingAuth$;

  login() {
    const { username, password } = this.userLoginForm.value;
    this.store.dispatch(login({ username: username, password: password }));
  }
}
