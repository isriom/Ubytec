import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GAfiliadoComponent} from "./GAfiliado.component";


/**
 * Metodo donde se realizar la configuracion de Angular
 */
describe('GAfiliadoComponent', () => {
  let component: GAfiliadoComponent;
  let fixture: ComponentFixture<GAfiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GAfiliadoComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GAfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
