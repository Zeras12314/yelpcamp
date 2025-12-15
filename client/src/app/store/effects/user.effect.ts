import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from '../actions/user.action';
import { UserService } from '../../services/user.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  router = inject(Router);
  userService = inject(UserService);
  toastr = inject(ToastrService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) =>
        this.userService.login(username, password).pipe(
          tap(() => {
            this.toastr.success('Succesfully login');
            this.router.navigate(['/']);
          }),
          map((res) => loginSuccess({ user: res.user })),
          catchError((error) => {
            this.toastr.error(error.error.message, 'Error');
            return of(loginFailure({ error }));
          })
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap(({ username, password, email }) =>
        this.userService.register(username, password, email).pipe(
          tap(() => {
            this.toastr.success('Succesfully Registered!');
            this.router.navigate(['/campgrounds/login']);
          }),
          map((res) => {
            const { id, username, email } = res.user; // extract from inner user object
            return registerSuccess({ user: { id, username, email } });
          }),
          catchError((error) => {
            this.toastr.error(error.error.message, 'Error');
            return of(registerFailure({ error }));
          })
        )
      )
    )
  );
}
