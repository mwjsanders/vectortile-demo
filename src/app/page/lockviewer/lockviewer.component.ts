import {Component, ViewChild} from '@angular/core';
import {MapComponent} from '../../map/map.component';
import {MatActionList, MatList, MatListItem} from '@angular/material/list';

@Component({
  selector: 'app-lockviewer',
  imports: [
    MapComponent,
    MatActionList,
    MatListItem,
  ],
  templateUrl: './lockviewer.component.html',
  styleUrl: './lockviewer.component.css'
})
export class LockviewerComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;

  locks: Lock[] = [
    { name: 'Krammersluizen', location:  {lon: 4.1613, lat: 51.6614}, orientation: 4 },
    { name: 'Roompotsluis', location:  {lon: 3.6849, lat: 51.6186}, orientation: -6},
    { name: 'Kreekraksluizen', location: {lon: 4.23, lat: 51.445}, orientation: -84 },
  ];
  selectedLock?: Lock;

  onSelectLock(lock: Lock) {
    if (this.mapComponent) {
      console.log(lock)
      this.mapComponent.zoomToCoordinate(lock.location.lon, lock.location.lat, lock.orientation);
    }
  }

}

export interface Location {
  lon: number;
  lat: number;
}
export interface Lock {
  name: string;
  location: Location;
  orientation: number
}
