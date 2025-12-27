import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Campground } from '../../models/campground.model';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../store/store.service';

@Component({
  selector: 'app-campgrounds',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './campgrounds.component.html',
  styleUrl: './campgrounds.component.scss',
})
export class CampgroundsComponent {
  private router = inject(Router);
  private storeService = inject(StoreService);
  campGrounds$ = this.storeService.campGrounds$;
  loading$ = this.storeService.loading$;
  campGrounds: Campground[] = [];

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
  sortByDate() {
    this.campGrounds = [...this.campGrounds].sort((a, b) => {
      const timeA = parseInt(a._id.substring(0, 8), 16);
      const timeB = parseInt(b._id.substring(0, 8), 16);
      return timeB - timeA; // newest first
    });
  }
}
