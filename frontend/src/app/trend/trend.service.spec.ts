import { TestBed } from '@angular/core/testing';

import { TrendService } from '../services/product.service';

describe('TrendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrendService = TestBed.get(TrendService);
    expect(service).toBeTruthy();
  });
});
