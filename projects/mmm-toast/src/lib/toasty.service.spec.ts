import { TestBed, inject } from '@angular/core/testing';

import { ToastyService } from './toasty.service';

describe('NgxToastyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastyService]
    });
  });

  it('should be created', inject([ToastyService], (service: ToastyService) => {
    expect(service).toBeTruthy();
  }));
});
