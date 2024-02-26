import { TestBed } from '@angular/core/testing';

import { BuscarUsuariosService } from './buscar-usuarios.service';

describe('BuscarUsuariosService', () => {
  let service: BuscarUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscarUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
