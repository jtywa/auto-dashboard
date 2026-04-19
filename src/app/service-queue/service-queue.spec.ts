import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceQueue } from './service-queue';

describe('ServiceQueue', () => {
  let component: ServiceQueue;
  let fixture: ComponentFixture<ServiceQueue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceQueue],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceQueue);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
