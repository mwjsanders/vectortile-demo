import {Component, ViewChild} from '@angular/core';
import {MapComponent} from '../../map/map.component';
import {MatFormField} from '@angular/material/input';
import {MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect, MatSelectChange} from '@angular/material/select';
import {FormControl, FormsModule} from '@angular/forms';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {Style} from '../../model/style';

@Component({
  selector: 'app-lockviewer',
  imports: [
    MapComponent,
    MatFormField,
    MatLabel,
    FormsModule,
    MatSelect,
    MatOption,
    MatGridList,
    MatGridTile,
  ],
  templateUrl: './lockviewer.component.html',
  styleUrl: './lockviewer.component.css'
})
export class LockviewerComponent {
  locksForm = new FormControl('');
  locks: Lock[] = [
    { name: 'Krammersluizen', location:  {lon: 4.1613, lat: 51.6614}, orientation: 4 },
    { name: 'Roompotsluis', location:  {lon: 3.6849, lat: 51.6186}, orientation: -6},
    { name: 'Kreekrakluizen', location: {lon: 4.23, lat: 51.445}, orientation: -84 },
  ];
  selectedLock?: Lock;

  @ViewChild(MapComponent) mapComponent!: MapComponent;

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
