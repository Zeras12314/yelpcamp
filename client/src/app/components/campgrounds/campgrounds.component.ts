import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { Campground } from '../../models/campground.model';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../store/store.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { MapTilerService } from '../../services/map-tiler.service';
import { env } from '../../../environment/environment';
import { Store } from '@ngrx/store';
import { sortCampgrounds } from '../../store/actions/camp.action';

@Component({
  selector: 'app-campgrounds',
  imports: [AsyncPipe, RouterLink, LoadingComponent, SlicePipe],
  templateUrl: './campgrounds.component.html',
  styleUrl: './campgrounds.component.scss',
})
export class CampgroundsComponent implements OnDestroy {
  private router = inject(Router);
  private store = inject(Store);
  private storeService = inject(StoreService);
  private mapService = inject(MapTilerService);

  campGrounds$ = this.storeService.campGrounds$;
  loading$ = this.storeService.loading$;
  errorLoading$ = this.storeService.error$;
  campGrounds: any[] = [];
  campgroundsGeoJson!: GeoJSON.FeatureCollection;
  private map!: any; // store map instance
  imageLoading = false;
  mapLoaded = this.mapService.mapLoaded;
  isSort: boolean = false

  ngOnInit() {
    this.storeService.getCampGrounds();

    // Subscribe to observable and initialize map when data arrives
    this.campGrounds$.subscribe((camps) => {
      this.campGrounds = [...camps];

      if (this.campGrounds.length === 0 || this.isSort) return;
      // Convert to GeoJSON
      this.campgroundsGeoJson = {
        type: 'FeatureCollection',
        features: this.campGrounds.map((camp) => ({
          type: 'Feature',
          geometry: camp.geometry,
          properties: {
            popUpMarkup:
              camp.properties?.popUpMarkup || `<strong>${camp.title}</strong>`,
          },
        })),
      };

      // Initialize map after data is ready

      this.map = this.mapService.createMap(
        'map-all',
        this.campgroundsGeoJson,
        env.mapTilerApiKey
      );
    });
  }

  sortBy(type: keyof Campground, direction: 'asc' | 'desc' = 'asc') {
    this.store.dispatch(sortCampgrounds({ sortBy: type, direction }));
    this.isSort = true;
  }


  viewDetails(camp: Campground) {
    this.router.navigate(['/campground-details', camp._id]);
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove(); // clean up map instance
  }
}
