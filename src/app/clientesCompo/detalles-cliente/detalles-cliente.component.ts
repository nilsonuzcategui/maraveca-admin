import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/_servicios/clientes.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | any;
  columnasServicios: string[] = ['id', 'name_plan', 'direccion'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  columnasHistorial: string[] = ['history', 'modulo', 'nombre_user', 'created_at'];

  //VARIABLES PARA DATOS PERSONALES
  idcliente: any = this._route.snapshot.paramMap.get('id');
  registerForm = this.formBuilder.group({
    userid: [{value: this.idcliente, disabled: true}, Validators.required],
    tipo_cedula: [{value: 'V', disabled: true}, Validators.required],
    cedula: [{value: '', disabled: true}, Validators.required],
    nombre: [{value: '', disabled: true}, Validators.required],
    apellido: [{value: '', disabled: true}, Validators.required],
    fecha_nacimiento: [{value: '', disabled: true}],
    telefono: [{value: '', disabled: true}],
    correo: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    idestado: [{value: '', disabled: true}, Validators.required],
    idmunicipio: [{value: '', disabled: true}, Validators.required],
    idparroquia: [{value: '', disabled: true}, Validators.required],
    social: [null],
    direccion: [{value: '', disabled: true}],
    facturable: [false],
  });

  //VARIABLES PARA DINAMISCO
  loading: boolean = true;

  //VARIABLES PARA EL CONTENIDO
  servicios: MatTableDataSource<any> = <any>[];
  historial = new MatTableDataSource<any>();
  

  constructor(
    private _route: ActivatedRoute,
    private _clientes: ClientesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._clientes.traerDatosCliente(this.idcliente).subscribe(
      (res: any) => {
        if (res.length > 0) {
          let datos = res[0]
          console.log(datos);
          //Seteo de variables
          this.registerForm = this.formBuilder.group({
            userid: [{value: this.idcliente, disabled: true}, Validators.required],
            tipo_cedula: [{value: datos['kind'], disabled: true}, Validators.required],
            cedula: [{value: datos['dni'], disabled: true}, Validators.required],
            nombre: [{value: datos['nombre'], disabled: true}, Validators.required],
            apellido: [{value: datos['apellido'], disabled: true}, Validators.required],
            fecha_nacimiento: [{value: datos['day_of_birth'], disabled: true}],
            telefono: [{value: datos['phone1'], disabled: true}],
            correo: [{value: datos['email'], disabled: true}, [Validators.required, Validators.email]],
            idestado: [{value: datos['estado'], disabled: true}, Validators.required],
            idmunicipio: [{value: datos['municipio'], disabled: true}, Validators.required],
            idparroquia: [{value: datos['parroquia'], disabled: true}, Validators.required],
            social: [null],
            direccion: [{value: datos['direccion'], disabled: true}],
            facturable: [false],
          });
        }else{
          this._snackBar.open('Lo siento, no pudimos obtener los datos del cliente', 'ok', {
            duration: 4000,
          });
        }
      },(err: any) => {
        console.log(err);
       
      }
    );

    this.obtenerServiciosClientes();
  }

  ngAfterViewInit() {
    console.log('ngaferviweninit por aqui');
    this.historial.paginator = this.paginator;
  }

  obtenerServiciosClientes(){
    this.loading = true;
    this._clientes.obtenerServiciosClientes(this.idcliente).subscribe(
      (res: any) =>{
        console.log(res);
        this.servicios = new MatTableDataSource<any>(res['servicios']);
        this.historial = new MatTableDataSource<any>(res['history']);
        this.historial.paginator = this.paginator;
        this.ngAfterViewInit();
      },(err: any) => {
        console.log(err);
        this._snackBar.open('Error al obtener datos de los servicios', 'ok',{duration: 5000});
      },() => {
        this.loading = false;
      }
    );
  }

}
