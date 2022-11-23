import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SAGerenteComponent} from "./SAGerente.component";


/**
 * Metodo donde se realizar la configuracion de Angular
 */
describe('SAGerenteComponent', () => {
  let component: SAGerenteComponent;
  let fixture: ComponentFixture<SAGerenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SAGerenteComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SAGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
