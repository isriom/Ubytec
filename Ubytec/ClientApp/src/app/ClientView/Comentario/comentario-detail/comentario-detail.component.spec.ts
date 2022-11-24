import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioDetailComponent } from './comentario-detail.component';

describe('ComentarioDetailComponent', () => {
  let component: ComentarioDetailComponent;
  let fixture: ComponentFixture<ComentarioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComentarioDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComentarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
