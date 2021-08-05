import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActualizarDolarComponent } from '../planesComponentes/actualizar-dolar/actualizar-dolar.component';
import { AgregarPlanComponent } from '../planesComponentes/agregar-plan/agregar-plan.component';
import { TablasPlanesComponent } from '../planesComponentes/tablas-planes/tablas-planes.component';
import { PlanesService } from '../_servicios/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  @ViewChild(TablasPlanesComponent) tablaHijo: TablasPlanesComponent | any;

  loading: boolean = true;
  userData: any;

  //Variables para contenido
  plan="p";

  filtratoTexto = '';
  datosTabla1: any;
  datosTabla2: any;
  datosTabla3: any;
  datosTabla4: any;
  datosTabla5: any;
  datosTabla6: any;
  datosTabla7: any;

  constructor(
    private _planes: PlanesService,
    private _snackBar: MatSnackBar,
    private MatDialog: MatDialog,
  ) {
    this.userData = JSON.parse(<any>localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.buscarDatos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filtratoTexto = filterValue;
  }

  buscarDatos(){
    this.loading = true;
    this._planes.traerClientes(this.userData['id_user'], this.plan).subscribe(
      (res:any) => {
        this.datosTabla1 = res['planes'];
        this.datosTabla2 = res['planes2'];
        this.datosTabla3 = res['planesd'];
        this.datosTabla4 = res['planes3'];
        this.datosTabla5 = res['planes6'];
        this.datosTabla6 = res['planes7'];
        this.datosTabla7 = res['mb'];
      },(err: any) => {
        console.log(err);
        this._snackBar.open('Lo siento, no pudimos obtener los datos de los planes', 'ok', {duration: 4000});
      }, () => {
        this.loading = false;
      }
    );
  }

  cambioDeTablaPadre(datos: any){
    this.plan = datos;
    this.buscarDatos();
  }

  actualizarTabla(){
    this.buscarDatos();
  }

  abrirDialogoActualizarDolar(){
    let dialogRef = this.MatDialog.open(ActualizarDolarComponent,
      {
        width: '400px',
        data: this.userData['id_user']
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if (result == 200) { //lo que recibo de larevel
            this.buscarDatos();
          }
        }
      );
  }

  abrirDialogoAgregar(){
    let dialogRef = this.MatDialog.open(AgregarPlanComponent,
      {
        width: '600px',
        data: this.userData['id_user']
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if (result) { //True si se agregó el plan
            this.buscarDatos();
          }
        }
      );
  }

  eventoEditarPlan(){
    this.buscarDatos();
  }

}

export interface TablaPlanes {
  id_plan: number;
  tipo_plan: number;
  name_plan: string;
  taza: number;
  cost_plan: number;
  dmb_plan: number;
  carac_plan: number;
  descripcion: string;
  created_at: string;
  updated_at: string;
}

export interface InterfazMegasContratados {
  id_plan: number;
  cantidad: number;
  carac_plan: number;
  descarga: number;
  name_plan: string;
  subida: number;
}