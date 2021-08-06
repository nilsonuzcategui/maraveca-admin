import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-tabla-cliente-balance-exoneraciones',
  templateUrl: './tabla-cliente-balance-exoneraciones.component.html',
  styleUrls: ['./tabla-cliente-balance-exoneraciones.component.css']
})
export class TablaClienteBalanceExoneracionesComponent implements OnInit {

  @Input() data: any;
  @Input() clienteSerie: any;
  dataSource = new MatTableDataSource<any>();
  columnasBalancesPagos: string[] = ['id_bal', 'created_at', 'bal_monto', 'bal_tip','bal_stat'];
  columnasBalancesPagos2: string[] = ['id_bal_in', 'created_at', 'bal_monto_in', 'bal_comment_in', 'bal_tip_in','bal_stat_in'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  facturable = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if(this.clienteSerie){
      this.facturable = this.clienteSerie['serie'];
    }
    
    if (changes.data) {
      if (this.facturable == 1) {
        this.dataSource = new MatTableDataSource<any>(changes.data.currentValue.data);
      }else{
        this.dataSource = new MatTableDataSource<any>(changes.data.currentValue.data);
      }
      
      this.ngAfterViewInit();
    }
  }

}
