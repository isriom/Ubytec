import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidadoVentasComponent } from './consolidado-ventas.component';

describe('ConsolidadoVentasComponent', () => {
  let component: ConsolidadoVentasComponent;
  let fixture: ComponentFixture<ConsolidadoVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidadoVentasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidadoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
