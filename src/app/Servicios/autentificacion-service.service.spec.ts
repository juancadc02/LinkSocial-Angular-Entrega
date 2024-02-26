import { TestBed } from '@angular/core/testing';

import { AutentificacionServiceService } from './autentificacion-service.service';

describe('AutentificacionServiceService', () => {
  let service: AutentificacionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutentificacionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
