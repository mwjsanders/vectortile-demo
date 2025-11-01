import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleselectorComponent } from './styleselector.component';

describe('StyleselectorComponent', () => {
  let component: StyleselectorComponent;
  let fixture: ComponentFixture<StyleselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleselectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
