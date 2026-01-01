import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { campGroundsReducer } from './store/reducers/camp.reducer';
import { CampGroundEffects } from './store/effects/camp.effect';
import { reviewReducer } from './store/reducers/review.reducer';
import { ReviewEffects } from './store/effects/review.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './interceptors/auth.interceptor';
import { authReducer } from './store/reducers/user.reducer';
import { UserEffects } from './store/effects/user.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({
      campgrounds: campGroundsReducer,
      review: reviewReducer,
      userAuth: authReducer,
    }),
    provideEffects([CampGroundEffects, ReviewEffects, UserEffects]),
    provideAnimations(), // required animations providers
    importProvidersFrom(BrowserAnimationsModule), // ✅ correct way to "import" modules
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
