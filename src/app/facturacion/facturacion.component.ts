import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacturacionService } from '../_servicios/facturacion.service';

export interface FacturacionInterfaz {
  id: number;
  cliente: string;
  denominacion: string;
  deuda: number;
  dni: string;
  estado: string;
  fac_num: string;
  fac_serv: string;
  fac_status: string;
  id_cliente: string;
  monto: number;
  name_plan: string;
  pagado: number;
  serie_fac: number;
  tasa_generacion: number;
  tasa_pago: string;
  tipoServicio: string;
  tipo_srv: number;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {
  iduser = JSON.parse(<any>localStorage.getItem('currentUser'))['id_user'];

  displayedColumns: string[] = [ 'id', 'cliente', 'estado', 'monto', 'deuda', 'created_at', 'acciones'];
  dataSource = new MatTableDataSource<FacturacionInterfaz>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  loading: boolean = true;
  noHayDatos: boolean = false;

  arrayDatos:any = [];

  //VARIABLES
  total: number = 0;
  porcentaje: number = 10; //en base a 100%
  numFilas: number = 0;
  numFilasObtenidas: number = 0;

  //Variables para el loading
  valueLoading = 0; //lo que lleva
  bofferLoading = this.porcentaje; //lo que busca

  //variables para los busqueda con filtos
  estadofactura: string = '';
  fechafiltrofactura = 'hoy';
  sql = '';

  constructor(
    private _factura: FacturacionService
  ) { }

  ngOnInit(): void {
    this.obtenerNumerodeFilas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  changeEstadoFactura() {
    let filterValue = this.estadofactura;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerNumerodeFilas(){
    this.noHayDatos = false;

    this._factura.traerFacturacionesNumFilas(this.iduser, this.porcentaje, this.fechafiltrofactura).subscribe(
      (res: any) => {
        console.log(res);
        this.total = res['cuerpo'];
        this.numFilas = res['numFilas'];
        this.sql = res['sql'];
        this.numFilasObtenidas = 0;

        //HACER LAS BUSQUEDAS
        if (this.total > 0) {
          this.obtenerDatos();
        }else{
          //no se encontraron datos
          this.loading = false;
          this.noHayDatos = true;
        }
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  obtenerDatos(){
    console.log('buscando datos...');
    this.loading = true;
    this._factura.traerFacturaciones(this.iduser, this.total, this.numFilas, this.numFilasObtenidas, this.sql).subscribe(
      (res: any) => {
        console.log('respuesta obtener datos ->', res);
        if (res['respuesta'] == 'exito') {
          this.numFilasObtenidas = (this.numFilasObtenidas + this.numFilas);
          this.arrayDatos = this.arrayDatos.concat(res['cuerpo']);
          console.log(this.arrayDatos);
          console.log('SUmando -> ',this.numFilasObtenidas);

          this.dataSource = new MatTableDataSource<FacturacionInterfaz>(this.arrayDatos);
          this.dataSource._updateChangeSubscription();
          this.ngAfterViewInit();

          //Set variables para el loading
          this.valueLoading = (this.valueLoading + this.porcentaje);
          this.bofferLoading = (this.bofferLoading + this.porcentaje);

          if (this.numFilasObtenidas < this.total) {
            this.obtenerDatos();
          }else{
            //busqueda terminada! valores a 0 de nuevo
            this.numFilas = 0;
            this.numFilasObtenidas = 0;
            this.loading = false;
          }
        }
        
      }, (err: any) => {
        console.log(err);
      }
    );
  }

  obtenerSaldos(idcliente: number){
    this._factura.traerSaldosClientes(idcliente).subscribe(
      (res: any) => {
        console.log(res);
        let indice = this.arrayDatos.findIndex((u: any) => u.id == idcliente);
        this.arrayDatos[indice]['monto'] = res['cuerpo']['monto'];
        this.dataSource = this.arrayDatos;
        this.dataSource._updateChangeSubscription();
      }, (err: any) => {
        console.log(err);
      }, () => {
        // this.loading = false;
      }
    );
  }

  radioChange($event: MatRadioChange) {
    this.fechafiltrofactura = $event.value;
    this.estadofactura = '';
    this.arrayDatos = [];
    this.dataSource = new MatTableDataSource<FacturacionInterfaz>(this.arrayDatos);
    this.dataSource._updateChangeSubscription();
    this.ngAfterViewInit();
    this.obtenerNumerodeFilas();
  }

  clickedRows(row :any){
    console.log(row);
  }

}
