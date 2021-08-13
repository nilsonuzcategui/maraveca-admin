import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertaPreguntaCerradaComponent } from './alerta-pregunta-cerrada.component';

describe('AlertaPreguntaCerradaComponent', () => {
  let component: AlertaPreguntaCerradaComponent;
  let fixture: ComponentFixture<AlertaPreguntaCerradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertaPreguntaCerradaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaPreguntaCerradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
