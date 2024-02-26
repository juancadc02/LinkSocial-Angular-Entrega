import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirPublicacionesComponent } from './subir-publicaciones.component';

describe('SubirPublicacionesComponent', () => {
  let component: SubirPublicacionesComponent;
  let fixture: ComponentFixture<SubirPublicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubirPublicacionesComponent]
    });
    fixture = TestBed.createComponent(SubirPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
