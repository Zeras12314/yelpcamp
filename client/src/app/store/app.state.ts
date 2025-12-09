import { CampGroundState } from './camp/camp.reducer';
import { ReviewState } from './review/review.reducer';

export interface AppState {
  campgrounds: CampGroundState; // matches the key used in provideStore
  review: ReviewState; // matches the key used in provideStore
}
