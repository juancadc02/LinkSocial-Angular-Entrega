import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAdminComponent } from './lista-admin.component';

describe('ListaAdminComponent', () => {
  let component: ListaAdminComponent;
  let fixture: ComponentFixture<ListaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAdminComponent]
    });
    fixture = TestBed.createComponent(ListaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
