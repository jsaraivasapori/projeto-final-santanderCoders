import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboardservice.service';

describe('DashboardserviceService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
