import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Campground } from '../../models/campground.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCampGrounds, selectLoading } from '../../store/camp.selector';
import { loadCampGrounds } from '../../store/camp.action';

@Component({
  selector: 'app-campgrounds',
  imports: [AsyncPipe],
  templateUrl: './campgrounds.component.html',
  styleUrl: './campgrounds.component.scss',
})
export class CampgroundsComponent {
  private router = inject(Router);
  private store = inject(Store);
  campGrounds$ = this.store.select(selectCampGrounds); // like create observable and assigning the value
  loading$ = this.store.select(selectLoading);

  ngOnInit() {
        this.store.dispatch(loadCampGrounds());
  }

  viewDetails(camp: Campground) {
    this.router.navigate(['/campground-details', camp._id]);
    
  }
}
