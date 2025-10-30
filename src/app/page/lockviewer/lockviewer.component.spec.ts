import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LockviewerComponent } from './lockviewer.component';

describe('LockviewerComponent', () => {
  let component: LockviewerComponent;
  let fixture: ComponentFixture<LockviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockviewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LockviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
