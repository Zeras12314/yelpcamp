import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { FooterComponent } from './components/shared/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { appInit } from './store/actions/user.action';
import { AsyncPipe, NgClass } from '@angular/common';
import { MessagesComponent } from './components/shared/messages/messages.component';
import { StoreService } from './store/store.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgClass, MessagesComponent, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'yelpcamp';
  store = inject(Store);
  router = inject(Router);
  storeService = inject(StoreService);
  isReview$ = this.storeService.isReview$;
  dispalyLandingImage2(): boolean {
    const url = this.router.url.toLowerCase();
    return (
      url.includes('login') ||
      url.includes('register') ||
      url === '/' ||
      url.includes('home')
    );
  }
  dispalyLandingImage(): boolean {
    return true;
  }
  ngOnInit(): void {
    this.store.dispatch(appInit());
  }
}
