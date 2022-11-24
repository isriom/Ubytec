import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioEditComponent } from './comentario-edit.component';

describe('ComentarioEditComponent', () => {
  let component: ComentarioEditComponent;
  let fixture: ComponentFixture<ComentarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentarioEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
