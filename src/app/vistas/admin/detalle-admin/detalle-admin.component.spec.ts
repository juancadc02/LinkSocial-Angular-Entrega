import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAdminComponent } from './detalle-admin.component';

describe('DetalleAdminComponent', () => {
  let component: DetalleAdminComponent;
  let fixture: ComponentFixture<DetalleAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleAdminComponent]
    });
    fixture = TestBed.createComponent(DetalleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
