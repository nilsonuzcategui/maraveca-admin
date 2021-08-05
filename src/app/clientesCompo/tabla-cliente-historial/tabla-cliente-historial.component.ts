import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-cliente-historial',
  templateUrl: './tabla-cliente-historial.component.html',
  styleUrls: ['./tabla-cliente-historial.component.css']
})
export class TablaClienteHistorialComponent implements OnInit {
  @Input() data: any;
  dataSource = new MatTableDataSource<any>();
  columnasHistorial: string[] = ['history', 'modulo', 'nombre_user', 'created_at'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.dataSource = new MatTableDataSource<any>(changes.data.currentValue.data);
      this.ngAfterViewInit();
    }
  }

}
