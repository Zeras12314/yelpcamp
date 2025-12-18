import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  appInit,
  loadUser,
  loadUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  register,
  registerFailure,
  registerSuccess,
} from '../actions/user.action';
import { UserService } from '../../services/user.service';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  router = inject(Router);
  userService = inject(UserService);
  toastr = inject(ToastrService);
  store = inject(Store);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ username, password }) =>
        this.userService.login(username, password).pipe(
          tap(() => {
            this.toastr.success('Succesfully login');
            this.router.navigate(['/home']);
          }),
          map((res) => {
            const user: User = {
              id: res.user._id, // map MongoDB _id to frontend id
              username: res.user.username,
              email: res.user.email,
            };
            return loginSuccess({ user });
          }),
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
            this.router.navigate(['/home']);
          }),
          switchMap((res) => {
            const user: User = {
              id: res._id,
              username: res.username,
              email: res.email,
            };
            return of(registerSuccess({ user }));
          }),
          catchError((error) => {
            this.toastr.error(error.message, 'Error');
            return of(registerFailure({ error }));
          })
        )
      )
    )
  );

  loadUserAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => loadUser()) // dispatch loadUser once
    )
  );

loadUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUser, appInit), // triggers on app start or after login
    switchMap(() =>
      this.userService.authMe().pipe(
        map((user) => loadUserSuccess({ user })), // ✅ pass user here
      )
    )
  )
);


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      switchMap(() =>
        this.userService.logout().pipe(
          map(() => logoutSuccess()), // dispatch success action
          tap(() => {
            this.toastr.success('Succesfully Logout!');
            this.router.navigate(['/campgrounds/login']);
          }),
          catchError((error) => of(logoutFailure({ error }))) // dispatch failure action
        )
      )
    )
  );
}
