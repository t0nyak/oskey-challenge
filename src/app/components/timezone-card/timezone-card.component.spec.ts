import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneCardComponent } from './timezone-card.component';

describe('TimezoneCardComponent', () => {
  let component: TimezoneCardComponent;
  let fixture: ComponentFixture<TimezoneCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimezoneCardComponent]
    });
    fixture = TestBed.createComponent(TimezoneCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
