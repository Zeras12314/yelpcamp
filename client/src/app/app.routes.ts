import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CampgroundDetailsComponent } from './components/campground-details/campground-details.component';
import { AddEditCampgroundComponent } from './components/campgrounds/add-edit-campground/add-edit-campground.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default to '/home'
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'campground-details/:id', component: CampgroundDetailsComponent },
  { path: 'campgrounds/:id/:action', component: AddEditCampgroundComponent },
  { path: 'campgrounds/add-campground', component: AddEditCampgroundComponent },
  { path: '**', redirectTo: 'not-found' },
];
