import { TestBed } from '@angular/core/testing';

import { GenerateSasUrlService } from './generate-sas-url.service';

describe('GenerateSasUrlService', () => {
  let service: GenerateSasUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateSasUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
