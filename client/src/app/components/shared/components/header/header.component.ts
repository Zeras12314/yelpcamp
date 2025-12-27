import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { StoreService } from '../../../../store/store.service';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { logout } from '../../../../store/actions/user.action';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  userService = inject(UserService);
  storeService = inject(StoreService);
  store = inject(Store);
  user$ = this.storeService.getUser();
  isLoggedIn$ = this.storeService.getisLOggedIn();

  ngOnInit(): void {
  }

  logout() {
    this.store.dispatch(logout());
  }
}
