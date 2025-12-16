import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/components/header/header.component';
import { FooterComponent } from './components/shared/components/footer/footer.component';
import { Store } from '@ngrx/store';
import { appInit } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'yelpcamp';
  store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(appInit());
  }
}
