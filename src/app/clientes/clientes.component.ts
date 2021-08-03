import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ClientesService } from '../_servicios/clientes.service';
import { MatDialog } from '@angular/material/dialog';
import { AggClienteComponent } from '../clientesCompo/agg-cliente/agg-cliente.component';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';

export interface UserData {
  id: string;
  nombre: string;
  progress: string;
  fruit: string;
}

export interface DatosClientes {
  id: string;
  kind: string;
  dni: string;
  nombre: string;
  apellido: string;
  phone1: string;
  email: string;
  direccion: string;
}


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = [ 'cedula', 'cliente', 'telefono', 'correo', 'direccion', 'acciones'];
  // dataSource: any;
  // dataSource:any = new MatTableDataSource<any>([]);
  dataSource = new MatTableDataSource<PeriodicElement>();

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  

  //Variables
  loading: boolean = true;
  numerosClientes: any = 0;
  userData: any;
  datos_tabla: any = '1';

  constructor(
    private _clientes: ClientesService,
    private MatDialog: MatDialog,
    private router: Router
  ) {
    this.userData = JSON.parse(<any>sessionStorage.getItem('currentUser'));
    // console.log(this.userData);
  }

  ngOnInit() {
    this.obtenerClientes();
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

  clickedRows(row: any){
    // console.log(row);
    this.router.navigate(["/cliente-detalle", row['id']]);
  }

  radioChange($event: MatRadioChange) {
    this.datos_tabla = $event.value
    this.obtenerClientes();
}

  

  obtenerClientes(){
    this.loading = true;
    this._clientes.traerClientesApi(this.userData['id_user'], 1, this.datos_tabla,'mostrar_clientes').subscribe(
      (res : any) => {
        this.dataSource = new MatTableDataSource<PeriodicElement>(res['cuerpo']);
        this.numerosClientes = res['cuerpo'].length;
        this.ngAfterViewInit();
        this.loading = false;
      }, (err : any) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  abrirDialogoAgregar(){
    let dialogRef = this.MatDialog.open(AggClienteComponent,
      {
        width: '900px',
        data: this.userData['id_user']
      });

      dialogRef.afterClosed().subscribe(
        result => {
          this.obtenerClientes();
          // if(result['id'] > 0){
          //   this.arrayDatos.push({
          //     id: result['id'],
          //     nombre: result['nombre'],
          //     correo: result['correo'],
          //     telefono: result['telefono']
          //   });

          //   this.ELEMENT_DATA = this.arrayDatos;
          //   this.dataSource._updateChangeSubscription();

          //   this.openSnackBar('Usuario Agregado con exito!');
          // }
        }
      );
  }


}



export interface PeriodicElement {
  id: number;
  kind: string;
  dni: string;
  nombre: string;
  apellido: string;
  phone1: number;
  email: string;
  direccion: string;
}

var ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, kind: 'V', dni: '25127916', nombre: 'Hydrogen', apellido: 'uzcategui',  phone1: 1264, email: 'nilson@gmail.com', direccion: 'H'},
  {id: 1, kind: 'V', dni: '25127916', nombre: 'Hydrogen', apellido: 'uzcategui',  phone1: 1264, email: 'nilson@gmail.com', direccion: 'H'},
  {id: 1, kind: 'V', dni: '25127916', nombre: 'Hydrogen', apellido: 'uzcategui',  phone1: 1264, email: 'nilson@gmail.com', direccion: 'H'},
  {id: 1, kind: 'V', dni: '25127916', nombre: 'Hydrogen', apellido: 'uzcategui',  phone1: 1264, email: 'nilson@gmail.com', direccion: 'H'},
  {id: 1, kind: 'V', dni: '25127916', nombre: 'Hydrogen', apellido: 'uzcategui',  phone1: 1264, email: 'nilson@gmail.com', direccion: 'H'},
  {id: 1, kind: 'V', dni: '25127916', nombre: 'Hydrogen', apellido: 'uzcategui',  phone1: 1264, email: 'nilson@gmail.com', direccion: 'H'},
];