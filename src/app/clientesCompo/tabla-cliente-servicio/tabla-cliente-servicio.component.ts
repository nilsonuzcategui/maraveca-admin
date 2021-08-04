import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-tabla-cliente-servicio',
  templateUrl: './tabla-cliente-servicio.component.html',
  styleUrls: ['./tabla-cliente-servicio.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TablaClienteServicioComponent implements OnInit {
  @Input() data: any;
  dataSource = new MatTableDataSource<any>();
  expandedElement: PeriodicElement | any;
  columnsToDisplay = ['id_srv', 'name_plan', 'direccion'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  public ngOnChanges(changes: SimpleChanges) {
    // console.log('componente hijo en cambio->', changes.data.currentValue.data);
    if (changes.data) {
      this.dataSource = new MatTableDataSource<any>(changes.data.currentValue.data);
      this.ngAfterViewInit();
    }
  }

}
