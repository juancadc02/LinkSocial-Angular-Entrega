import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioSesionComponent } from './perfil-usuario-sesion.component';

describe('PerfilUsuarioSesionComponent', () => {
  let component: PerfilUsuarioSesionComponent;
  let fixture: ComponentFixture<PerfilUsuarioSesionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilUsuarioSesionComponent]
    });
    fixture = TestBed.createComponent(PerfilUsuarioSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
