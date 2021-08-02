import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMegasContratadosComponent } from './tabla-megas-contratados.component';

describe('TablaMegasContratadosComponent', () => {
  let component: TablaMegasContratadosComponent;
  let fixture: ComponentFixture<TablaMegasContratadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMegasContratadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMegasContratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
