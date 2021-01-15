import { TestBed } from '@angular/core/testing';

import { MmmToastService } from './mmm-toast.service';

describe('MmmToastService', () => {
  let service: MmmToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MmmToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
