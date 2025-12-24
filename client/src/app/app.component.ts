import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { FooterComponent } from './components/shared/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { appInit } from './store/actions/user.action';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'yelpcamp';
  store = inject(Store);
  router = inject(Router);
  dispalyLandingImage(): boolean {
    const url = this.router.url.toLowerCase();
    return (
      url.includes('login') ||
      url.includes('register') ||
      url === '/' ||
      url.includes('home')
    );
  }
  ngOnInit(): void {
    this.store.dispatch(appInit());
  }
}
