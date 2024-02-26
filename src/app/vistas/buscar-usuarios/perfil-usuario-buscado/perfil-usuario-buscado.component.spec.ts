import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUsuarioBuscadoComponent } from './perfil-usuario-buscado.component';

describe('PerfilUsuarioBuscadoComponent', () => {
  let component: PerfilUsuarioBuscadoComponent;
  let fixture: ComponentFixture<PerfilUsuarioBuscadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilUsuarioBuscadoComponent]
    });
    fixture = TestBed.createComponent(PerfilUsuarioBuscadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
