import { TestBed } from '@angular/core/testing';

import { SeguidoresService } from './seguidores.service';

describe('SeguidoresService', () => {
  let service: SeguidoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguidoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
