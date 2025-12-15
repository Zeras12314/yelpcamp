import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailure,
  loginSuccess,
  register,
  registerFailure,
  registerSuccess,
} from '../actions/user.action';
import { User } from '../../models/user.model';

export interface LoginState {
  user: User | null;
  loadingLogin: boolean;
  error: any;
}

export const initialStateLogin: LoginState = {
  user: null,
  loadingLogin: false,
  error: null,
};

export interface RegisterState {
  user: User | null;
  loadingRegister: boolean;
  error: any;
}

export const initialStateRegister: RegisterState = {
  user: null,
  loadingRegister: false,
  error: null,
};

export const loginReducer = createReducer(
  initialStateLogin,
  on(login, (state) => ({
    ...state,
    loadingLogin: true,
    error: null,
  })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    loadingLogin: false,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loadingLogin: false,
    error,
  }))
);

export const registerReducer = createReducer(
  initialStateRegister,
  on(register, (state) => ({
    ...state,
    loadingRegister: true,
    error: null,
  })),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    loadingRegister: false,
    user,
    error: null,
  })),
  on(registerFailure, (state, { error }) => ({
    ...state,
    loadingRegister: false,
    error,
  }))
);
