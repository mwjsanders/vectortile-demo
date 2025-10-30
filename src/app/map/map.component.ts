import { Component, OnInit, OnDestroy } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
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
          url: 'https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1/tiles/NetherlandsRDNewQuad/{z}/{y}/{x}?f=mvt',
        }),
      })


    this.map = new Map({
      target: 'map',
      layers: [
        brtaBaseVTLayer
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    fetch('assets/styles/wm_dark.json').then(res => res.json())
      .then(styleJson => applyStyle(brtaBaseVTLayer, styleJson, 'brt'));
  }

  ngOnDestroy(): void {
    this.map.setTarget(undefined);
  }
}
