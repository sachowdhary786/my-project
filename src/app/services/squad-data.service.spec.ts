import { TestBed } from '@angular/core/testing';

import { SquadDataService } from './squad-data.service';

describe('SquadDataService', () => {
  let service: SquadDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SquadDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
