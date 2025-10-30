import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MapComponent} from './map/map.component';
import {LockviewerComponent} from './page/lockviewer/lockviewer.component';

@Component({
  selector: 'app-root',
  imports: [LockviewerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vectortile-demo';
}
