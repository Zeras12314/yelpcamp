import { CampGroundState } from './reducers/camp.reducer';
import { LoginState } from './reducers/user.reducer';
import { ReviewState } from './reducers/review.reducer';

export interface AppState {
  campgrounds: CampGroundState; // matches the key used in provideStore
  review: ReviewState; // matches the key used in provideStore
  login: LoginState;
}
