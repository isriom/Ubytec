import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SAfiliacionComponent} from "./SAfiliacion.component";

/**
 * Metodo donde se realizar la configuracion de Angular
 */
describe('SAfiliacionComponent', () => {
  let component: SAfiliacionComponent;
  let fixture: ComponentFixture<SAfiliacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SAfiliacionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SAfiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
