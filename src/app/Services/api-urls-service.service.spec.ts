import { TestBed } from '@angular/core/testing';

import { ApiUrlsServiceService } from './api-urls-service.service';

describe('ApiUrlsServiceService', () => {
  let service: ApiUrlsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUrlsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
