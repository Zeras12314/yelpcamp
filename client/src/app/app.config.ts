import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { campGroundsReducer } from './store/camp/camp.reducer';
import { CampGroundEffects } from './store/camp/camp.effect';
import { reviewReducer } from './store/review/review.reducer';
import { ReviewEffects } from './store/review/review.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authInterceptor } from './store/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStore({ campgrounds: campGroundsReducer, review: reviewReducer }),
    provideEffects([CampGroundEffects, ReviewEffects]),
    provideAnimations(), // required animations providers
    importProvidersFrom(BrowserAnimationsModule), // ✅ correct way to "import" modules
    provideToastr(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
