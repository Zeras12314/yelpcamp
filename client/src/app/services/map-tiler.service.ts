import { Injectable } from '@angular/core';
import * as maptilersdk from '@maptiler/sdk';

@Injectable({ providedIn: 'root' })
export class MapTilerService {
  mapLoaded = false;

  createMap(
    containerId: string | HTMLElement,
    campgroundsGeoJson: GeoJSON.FeatureCollection,
    apiKey: string
  ): maptilersdk.Map {
    if (!containerId) return null;
    if (
      typeof containerId === 'string' &&
      !document.getElementById(containerId)
    )
      return null;
    maptilersdk.config.apiKey = apiKey;
    const map = new maptilersdk.Map({
      container: containerId,
      style: maptilersdk.MapStyle.BRIGHT,
      center: [-103.59179687498357, 40.66995747013945],
      zoom: 3,
    });

    map.on('load', () => {
      this.mapLoaded = true;

      map.addSource('campgrounds', {
        type: 'geojson',
        data: campgroundsGeoJson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#00BCD4',
            10,
            '#2196F3',
            30,
            '#3F51B5',
          ],
          'circle-radius': ['step', ['get', 'point_count'], 15, 10, 20, 30, 25],
        },
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 12,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      this.registerMapEvents(map);
    });

    return map;
  }

  private registerMapEvents(map: maptilersdk.Map) {
    map.on('click', 'clusters', async (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters'],
      });
      const clusterId = features[0].properties!['cluster_id'];
      const zoom = await (
        map.getSource('campgrounds') as any
      ).getClusterExpansionZoom(clusterId);

      map.easeTo({
        center: (features[0].geometry as any).coordinates,
        zoom,
      });
    });

    map.on('click', 'unclustered-point', (e) => {
      const { popUpMarkup } = e.features![0].properties as any;
      const coordinates = (e.features![0].geometry as any).coordinates.slice();

      new maptilersdk.Popup()
        .setLngLat(coordinates)
        .setHTML(popUpMarkup)
        .addTo(map);
    });

    map.on(
      'mouseenter',
      'clusters',
      () => (map.getCanvas().style.cursor = 'pointer')
    );
    map.on('mouseleave', 'clusters', () => (map.getCanvas().style.cursor = ''));
  }
}
