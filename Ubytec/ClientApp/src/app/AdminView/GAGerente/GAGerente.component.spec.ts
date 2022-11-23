import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GAGerenteComponent} from "./GAGerente.component";


/**
 * Metodo donde se realizar la configuracion de Angular
 */
describe('GAGerenteComponent', () => {
  let component: GAGerenteComponent;
  let fixture: ComponentFixture<GAGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GAGerenteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GAGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
