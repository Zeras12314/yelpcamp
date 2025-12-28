import { AfterViewInit, Component, Input } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';
import { env } from '../../../../../environment/environment';

@Component({
  selector: 'app-campground-map',
  imports: [],
  templateUrl: './campground-map.component.html',
  styleUrl: './campground-map.component.scss',
})
export class CampgroundMapComponent implements AfterViewInit {
  private map!: maptilersdk.Map;
  @Input() campground!: {
    title: string;
    location: string;
    geometry: {
      coordinates: [number, number]; // [lng, lat]
    };
  };

  ngAfterViewInit(): void {
    if (!this.campground?.geometry?.coordinates) return;

    // ✅ Set API key
    maptilersdk.config.apiKey = env.mapTilerApiKey;

    // ✅ Create map
    this.map = new maptilersdk.Map({
      container: 'map-single',
      style: maptilersdk.MapStyle.BRIGHT,
      center: this.campground.geometry.coordinates,
      zoom: 10,
    });

    // ✅ Marker + popup
    // Wait for style load before adding marker
    this.map.on('load', () => {
      new maptilersdk.Marker()
        .setLngLat(this.campground.geometry.coordinates)
        .setPopup(
          new maptilersdk.Popup({ offset: 25 }).setHTML(
            `<h3 style="color: #212529">${this.campground.title}</h3><p style="color: #212529">${this.campground.location}</p>`
          )
        )
        .addTo(this.map);
    });
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove(); // cleans up the old map
    }
  }
}
