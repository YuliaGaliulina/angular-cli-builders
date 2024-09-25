import { TestBed } from '@angular/core/testing';

import { BuilderHelperService } from './builder-helper.service';

describe('BuilderHelperService', () => {
  let service: BuilderHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuilderHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
