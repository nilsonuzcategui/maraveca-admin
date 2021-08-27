import { Component, Input, OnInit, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PopupGenerarFacturaComponent } from '../popup-generar-factura/popup-generar-factura.component';

export interface TablaBlancesFacturables {
  bal_cli: string;
  bal_comment: string;
  bal_comment_mod: string;
  bal_fecha_mod: string;
  bal_from: string;
  bal_monto: string;
  bal_rest: string;
  bal_stat: number;
  bal_tip: string;
  created_at: string;
  id_bal: number;
  tasa: string;
  updated_at: string;
  user_bal_mod: number;
}

export interface TablaBlancesNoFacturables {
  bal_cli_in: string;
  bal_comment_in: string;
  bal_comment_mod_in: string;
  bal_fecha_mod_in: string;
  bal_from_in: string;
  bal_monto_in: string;
  bal_rest_in: string;
  bal_stat_in: number;
  bal_tip_in: string;
  conversion: string;
  created_at: number;
  id_bal_in: number;
  tasa: string;
  updated_at: string;
  user_bal_mod_in: number;
  uso_bal_in: number;
}

@Component({
  selector: 'app-tabla-cliente-balances',
  templateUrl: './tabla-cliente-balances.component.html',
  styleUrls: ['./tabla-cliente-balances.component.css']
})
export class TablaClienteBalancesComponent implements OnInit {
  @Input() data: any;
  @Input() datosClientes: any;
  @Input() tablaFacturas: any;
  dataSource = new MatTableDataSource<any>();
  columnasBalancesPagos: string[] = ['id_bal', 'created_at', 'bal_monto', 'bal_tip','bal_stat'];
  columnasBalancesPagos2: string[] = ['id_bal_in', 'created_at', 'bal_monto_in', 'bal_comment_in', 'bal_tip_in','bal_stat_in'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  @Output() exitoAlCargarPago = new EventEmitter<boolean>();

  facturable = 0;

  idcliente: number = 0;

  constructor(
    private MatDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if(this.datosClientes){
      this.idcliente = this.datosClientes['id'];
      this.facturable = this.datosClientes['serie'];
    }
    
    if (changes.data) {
      if (this.facturable == 1) {
        this.dataSource = new MatTableDataSource<TablaBlancesFacturables>(changes.data.currentValue.data);

        console.log('hijo -> ',this.tablaFacturas);
        
      }else{
        this.dataSource = new MatTableDataSource<TablaBlancesNoFacturables>(changes.data.currentValue.data);
      }
      
      this.ngAfterViewInit();
    }
  }


  cargarPago() {
    let dialogRef = this.MatDialog.open(PopupGenerarFacturaComponent,
      {
        width: '600px',
        data: {
          'datosCliente': this.datosClientes,
          'tablaFacturacion': this.tablaFacturas
        }
      });

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {
        if (result) { //Actualizar tabla Balances
          this.exitoAlCargarPago.emit(result);
        }
      }
    );
  }

}
