import { Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Campground } from '../../models/campground.model';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../store/store.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { MapTilerService } from '../../services/map-tiler.service';
import { env } from '../../../environment/environment';

@Component({
  selector: 'app-campgrounds',
  imports: [AsyncPipe, RouterLink, LoadingComponent],
  templateUrl: './campgrounds.component.html',
  styleUrl: './campgrounds.component.scss',
})
export class CampgroundsComponent implements OnDestroy {
  private router = inject(Router);
  private storeService = inject(StoreService);
  private mapService = inject(MapTilerService);

  campGrounds$ = this.storeService.campGrounds$;
  loading$ = this.storeService.loading$;
  errorLoading$ = this.storeService.error$;
  campGrounds: any[] = [];
  campgroundsGeoJson!: GeoJSON.FeatureCollection;
  private map!: any; // store map instance
  imageLoading = false;

  ngOnInit() {
    this.storeService.getCampGrounds();

    // Subscribe to observable and initialize map when data arrives
    this.campGrounds$.subscribe((camps) => {
      this.campGrounds = [...camps];

      if (this.campGrounds.length === 0) return;

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

  viewDetails(camp: Campground) {
    this.router.navigate(['/campground-details', camp._id]);
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove(); // clean up map instance
  }
}
