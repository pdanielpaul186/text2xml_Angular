import { TestBed } from '@angular/core/testing';

import { ApiDataModelService } from './api-data-model.service';

describe('ApiDataModelService', () => {
  let service: ApiDataModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDataModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
