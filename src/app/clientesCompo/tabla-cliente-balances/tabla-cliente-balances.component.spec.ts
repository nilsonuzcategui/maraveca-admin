import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaClienteBalancesComponent } from './tabla-cliente-balances.component';

describe('TablaClienteBalancesComponent', () => {
  let component: TablaClienteBalancesComponent;
  let fixture: ComponentFixture<TablaClienteBalancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaClienteBalancesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaClienteBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
