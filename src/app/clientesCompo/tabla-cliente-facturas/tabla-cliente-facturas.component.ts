import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-cliente-facturas',
  templateUrl: './tabla-cliente-facturas.component.html',
  styleUrls: ['./tabla-cliente-facturas.component.css']
})
export class TablaClienteFacturasComponent implements OnInit {
  @Input() data: any;
  dataSource = new MatTableDataSource<any>();
  columnasHistorial: string[] = ['id', 'created_at', 'monto', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges) {
    // console.log('componente factura ->', changes.data.currentValue);
    
    if (changes.data) {
      this.dataSource = new MatTableDataSource<any>(changes.data.currentValue);
      this.ngAfterViewInit();
    }
  }

}
