import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablasPlanesComponent } from './tablas-planes.component';

describe('TablasPlanesComponent', () => {
  let component: TablasPlanesComponent;
  let fixture: ComponentFixture<TablasPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablasPlanesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablasPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
