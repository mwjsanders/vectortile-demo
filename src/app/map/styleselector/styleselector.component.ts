import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Style} from '../../model/style';

@Component({
  selector: 'styleselector',
  imports: [],
  templateUrl: './styleselector.component.html',
  styleUrl: './styleselector.component.css'
})
export class StyleselectorComponent {
  @Input() styles!: Style[];
  @Output() styleChange = new EventEmitter<Style>();

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectStyle(style: Style) {
    this.styleChange.emit(style);
    this.menuOpen = false;
  }
}
