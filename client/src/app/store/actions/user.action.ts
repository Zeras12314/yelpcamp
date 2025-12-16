import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const login = createAction(
  '[Login] Login User',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login] Login User Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Login] Login Use Failure',
  props<{ error: any }>()
);

export const register = createAction(
  '[Register] Register User',
  props<{ username: string; password: string; email: string }>()
);

export const registerSuccess = createAction(
  '[Register] Register User Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Register] Register User Failure',
  props<{ error: any }>()
);

export const logout = createAction('[Logout] Logout User');

export const logoutSuccess = createAction('[Logout] Logout User Success');

export const logoutFailure = createAction(
  '[Logout] Logout User Failure',
  props<{ error: any }>()
);

export const appInit = createAction('[App] Init');
