import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggClienteComponent } from './agg-cliente.component';

describe('AggClienteComponent', () => {
  let component: AggClienteComponent;
  let fixture: ComponentFixture<AggClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AggClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AggClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
