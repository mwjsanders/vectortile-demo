import {Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, ViewContainerRef} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import MousePosition from 'ol/control/MousePosition.js';
import {createStringXY} from 'ol/coordinate.js';
import { fromLonLat } from 'ol/proj';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import MVT from 'ol/format/MVT';
import {applyStyle} from 'ol-mapbox-style';
import {Style} from '../model/style';
import {StyleselectorComponent} from './styleselector/styleselector.component';
import {Control} from 'ol/control';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [
  ]
})
export class MapComponent implements  OnDestroy, AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('controlHost', { read: ViewContainerRef }) controlHost!: ViewContainerRef;

  private map!: Map;
  private brtaBaseVTLayer =  new VectorTileLayer({
    source: new VectorTileSource({
      format: new MVT(),
      url: 'https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1/tiles/WebMercatorQuad/{z}/{y}/{x}?f=mvt',
    }),
  })

  styles: Style[] = [
    { name: "custom dark", url : "assets/styles/wm_dark.json" },
    { name: "dark", url : "https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1/styles/darkmode__webmercatorquad?f=json"},
    { name: "standaard", url : "https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1/styles/standaard_zonder_labels__webmercatorquad?f=json"}
  ]

  ngAfterViewInit() {
    this.map = new Map({
      target: this.mapContainer.nativeElement,
      layers: [
        this.brtaBaseVTLayer
      ],
      view: new View({
        center: fromLonLat([5.3878, 52.1561]), // Center on The Netherlands
        zoom: 9,
      }),
    });

    // --- Create Angular component dynamically ---
    const compRef = this.controlHost.createComponent(StyleselectorComponent);
    compRef.instance.styles =this.styles;
    compRef.instance.styleChange.subscribe((selected) => {
      this.applyStyleToBRTALayer(selected.url)
    });

    // --- Wrap Angular component in OL Control ---
    const olControl = new Control({
      element: compRef.location.nativeElement,
    });

    // --- Add to the map ---
    this.map.addControl(olControl);


    this.applyStyleToBRTALayer('assets/styles/wm_dark.json')

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(4), // Show 4 decimal places
      projection: 'EPSG:4326', // Show in lon/lat (WGS84)
      className: 'mouse-position',
      target: document.getElementById('mouse-position')!, // Optional: put output in a custom div
    });

    this.map.addControl(mousePositionControl);
  }

  onSelectStyle(style: Style) {
      this.applyStyleToBRTALayer(style.url);
  }

  applyStyleToBRTALayer(url: string) {
    fetch(url).then(res => res.json())
      .then(styleJson => {
        applyStyle(this.brtaBaseVTLayer, styleJson, 'brt')
        this.brtaBaseVTLayer.changed();
      })
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
