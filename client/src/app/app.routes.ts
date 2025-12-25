import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CampgroundDetailsComponent } from './components/campground-details/campground-details.component';
import { AddEditCampgroundComponent } from './components/campgrounds/add-edit-campground/add-edit-campground.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CampgroundsComponent } from './components/campgrounds/campgrounds.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default to '/home'
  { path: 'home', component: HomeComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'campgrounds', component: CampgroundsComponent },
  { path: 'campground-details/:id', component: CampgroundDetailsComponent },
  { path: 'campgrounds/:id/:action', component: AddEditCampgroundComponent },
  { path: 'campgrounds/add-campground', component: AddEditCampgroundComponent },
  { path: 'campgrounds/login', component: LoginComponent },
  { path: 'campgrounds/register', component: RegisterComponent },
  { path: '**', redirectTo: 'not-found' },
];
