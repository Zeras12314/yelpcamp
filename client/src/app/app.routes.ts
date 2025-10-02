import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CampgroundDetailsComponent } from './components/campground-details/campground-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default to '/home'
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'campground-details/:id', component: CampgroundDetailsComponent },
  { path: '**', redirectTo: 'not-found' },
];
