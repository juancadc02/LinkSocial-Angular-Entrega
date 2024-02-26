import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarUsuariosComponent } from './buscar-usuarios.component';

describe('BuscarUsuariosComponent', () => {
  let component: BuscarUsuariosComponent;
  let fixture: ComponentFixture<BuscarUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarUsuariosComponent]
    });
    fixture = TestBed.createComponent(BuscarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
