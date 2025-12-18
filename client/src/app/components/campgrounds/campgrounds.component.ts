import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Campground } from '../../models/campground.model';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../store/store.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-campgrounds',
  imports: [AsyncPipe, RouterLink, LoadingComponent],
  templateUrl: './campgrounds.component.html',
  styleUrl: './campgrounds.component.scss',
})
export class CampgroundsComponent {
  private router = inject(Router);
  private storeService = inject(StoreService);
  campGrounds$ = this.storeService.campGrounds$;
  loading$ = this.storeService.loading$;
  errorLoading$ = this.storeService.error$;
  campGrounds: Campground[] = [];
  imageLoading = true;

  ngOnInit() {
    this.storeService.getCampGrounds();
    // Subscribe to observable and copy data to local array
    this.campGrounds$.subscribe((camps) => {
      this.campGrounds = [...camps];
    });
  }

  viewDetails(camp: Campground) {
    this.router.navigate(['/campground-details', camp._id]);
  }
}
