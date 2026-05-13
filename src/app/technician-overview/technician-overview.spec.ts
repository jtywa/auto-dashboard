import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianOverview } from './technician-overview';

describe('TechnicianOverview', () => {
  let component: TechnicianOverview;
  let fixture: ComponentFixture<TechnicianOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnicianOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnicianOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
