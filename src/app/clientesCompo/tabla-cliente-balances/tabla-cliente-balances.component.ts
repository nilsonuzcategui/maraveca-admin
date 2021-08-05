import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-cliente-balances',
  templateUrl: './tabla-cliente-balances.component.html',
  styleUrls: ['./tabla-cliente-balances.component.css']
})
export class TablaClienteBalancesComponent implements OnInit {
  @Input() data: any;
  @Input() clienteSerie: any;
  dataSource = new MatTableDataSource<any>();
  columnasBalancesPagos: string[] = ['id_bal', 'created_at', 'bal_monto', 'bal_tip','bal_stat'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges) {
    console.log('test ->',this.clienteSerie);
    
    if (changes.data) {
      this.dataSource = new MatTableDataSource<any>(changes.data.currentValue.data);
      this.ngAfterViewInit();
    }
  }

}
