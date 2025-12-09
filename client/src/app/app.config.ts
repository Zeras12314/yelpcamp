import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { campGroundsReducer } from './store/camp/camp.reducer';
import { CampGroundEffects } from './store/camp/camp.effect';
import { reviewReducer } from './store/review/review.reducer';
import { ReviewEffects } from './store/review/review.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ campgrounds: campGroundsReducer, review: reviewReducer }),
    provideEffects([CampGroundEffects, ReviewEffects]),
    provideAnimations(), // required animations providers
    importProvidersFrom(BrowserAnimationsModule), // ✅ correct way to "import" modules
    provideToastr(), // Toastr providers
  ],
};
