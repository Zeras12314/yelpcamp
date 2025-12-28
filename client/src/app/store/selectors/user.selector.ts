import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/user.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('userAuth');

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectIsLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
