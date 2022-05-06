import { TestBed } from '@angular/core/testing';

import { DiabetesFuzzyService } from './diabetes-fuzzy.service';

describe('DiabetesFuzzyService', () => {
  let service: DiabetesFuzzyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiabetesFuzzyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
