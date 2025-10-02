import { Component, inject } from '@angular/core';
import { CampgroundsService } from '../../services/campgrounds.service';
import { AsyncPipe } from '@angular/common';
import { Campground } from '../../models/campground.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campgrounds',
  imports: [AsyncPipe],
  templateUrl: './campgrounds.component.html',
  styleUrl: './campgrounds.component.scss'
})
export class CampgroundsComponent {
  private campGroundsService = inject(CampgroundsService);
  private router = inject(Router);

  // Expose observable for the template
  campgrounds$ = this.campGroundsService.getCampgrounds();
    ngOnInit() {
  }

  viewDetails(camp: Campground) {
    this.router.navigate(['/campground-details', camp._id]);
  }
}
