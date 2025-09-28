import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default to '/home'
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/not-found' },
];
