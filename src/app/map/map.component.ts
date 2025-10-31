import { Component, OnInit, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import { fromLonLat } from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import {applyStyle} from 'ol-mapbox-style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, OnDestroy {
  private map!: Map;

  async ngOnInit() {

    const brtaBaseVTLayer = new VectorTileLayer({
        source: new VectorTileSource({
          format: new MVT(),
          url: 'https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1/tiles/EuropeanETRS89_LAEAQuad/{z}/{y}/{x}?f=mvt',
        }),
      })


    this.map = new Map({
      target: 'map',
      layers: [
        brtaBaseVTLayer
      ],
      view: new View({
        center: fromLonLat([5.3878, 52.1561]), // Center on The Netherlands
        zoom: 9,
      }),
    });

    fetch('assets/styles/wm_dark.json').then(res => res.json())
      .then(styleJson => applyStyle(brtaBaseVTLayer, styleJson, 'brt'));

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4), // Show 4 decimal places
      projection: 'EPSG:4326', // Show in lon/lat (WGS84)
      className: 'mouse-position',
      target: document.getElementById('mouse-position')!, // Optional: put output in a custom div
    });

    this.map.addControl(mousePositionControl);
  }

  zoomToCoordinate(lon: number, lat: number, orientation: number) {
    const view = this.map.getView();
    view.animate({
      center: fromLonLat([lon, lat]),
      zoom: 14,
      rotation: Math.PI * orientation/180,
      duration: 1000,

    });
  }

  ngOnDestroy(): void {
    this.map.setTarget(undefined);
  }
}
