import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { Campground } from '../../models/campground.model';
import { Router, RouterLink } from '@angular/router';
import { StoreService } from '../../store/store.service';
import { LoadingComponent } from '../shared/loading/loading.component';
import { MapTilerService } from '../../services/map-tiler.service';
import { env } from '../../../environment/environment';
import { Store } from '@ngrx/store';
import { sortCampgrounds } from '../../store/actions/camp.action';
import { map, take } from 'rxjs/operators';
import { FeatureCollection, Feature, Geometry } from 'geojson';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-campgrounds',
  imports: [AsyncPipe, RouterLink, LoadingComponent, SlicePipe],
  templateUrl: './campgrounds.component.html',
  styleUrl: './campgrounds.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
  geoJson$: Observable<
    FeatureCollection<Geometry, { popUpMarkup: string }>
  > = this.campGrounds$.pipe(
    map((camps) => ({
      type: 'FeatureCollection',
      features: camps.map((camp) => ({
        type: 'Feature',
        geometry: camp.geometry,
        properties: {
          popUpMarkup:
            camp['properties']?.popUpMarkup || `<strong>${camp.title}</strong>`
        }
      }))
    }))
  );
  isSort: boolean = false

  ngOnInit() {
    this.storeService.getCampGrounds();

    this.geoJson$
      .pipe(
        map(geoJson => geoJson.features.length ? geoJson : null)
      )
      .subscribe((geoJson) => {
        if (!geoJson || this.map) return;

        this.map = this.mapService.createMap(
          'map-all',
          geoJson,
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
    this.map?.remove(); // clean up map instance
  }
}
