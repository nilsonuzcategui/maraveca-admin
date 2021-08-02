import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesService } from 'src/app/_servicios/clientes.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-agg-cliente',
  templateUrl: './agg-cliente.component.html',
  styleUrls: ['./agg-cliente.component.css']
})
export class AggClienteComponent implements OnInit {

  registerForm = this.formBuilder.group({
    tipo_cedula: ['V', Validators.required],
    cedula: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fecha_nacimiento: [''],
    telefono: [''],
    correo: ['', [Validators.required, Validators.email]],
    idestado: ['', Validators.required],
    idmunicipio: ['', Validators.required],
    idparroquia: ['', Validators.required],
    social: [null],
    direccion: [''],
    facturable: [false],
  });

  loading: boolean = false;
  estados = [];
  municipios = [];
  parroquia = [];
  userid: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    private _cliente: ClientesService,
    private MatDialogRef: MatDialogRef<AggClienteComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.userid = data;
  }

  ngOnInit(): void {
    this.loading = true;
    this._cliente.traerEstados().subscribe(
      (res : any) => {
        if (res['respuesta'] == 'exito') {
          this.estados = res['cuerpo'];
        }
        this.loading = false;
      }, (err : any) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  ngOnDestroy(){
    this.MatDialogRef.close(this.registerForm.value);
  }

  cambiandoEstado(e: any){
    this.loading = true;
    let idestado = e['value'];
    this.registerForm.controls['idestado'].setValue(idestado);
    this._cliente.traerMunicipios(idestado).subscribe(
      (res : any) => {
        if (res['respuesta'] == 'exito') {
          this.municipios = res['cuerpo'];
        }
        this.loading = false;
      }, (err : any) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  cambiandoMunicipio(e: any){
    this.loading = true;
    let idmunicipio = e['value'];
    this.registerForm.controls['idmunicipio'].setValue(idmunicipio);
    this._cliente.traerParroquia(idmunicipio).subscribe(
      (res : any) => {
        if (res['respuesta'] == 'exito') {
          this.parroquia = res['cuerpo'];
        }
        this.loading = false;
      }, (err : any) => {
        this.loading = false;
        console.log(err);
      }
    );
  }

  getErrorMessage() {
    if (this.registerForm.controls['correo'].hasError('required')) {
      return 'El correo es necesario';
    }

    return this.registerForm.controls['correo'].hasError('email') ? 'Ingrese un correo valido' : '';
  }

  submitAgregar(){
    this.loading = true;
    let datos = this.registerForm.value;
    this._cliente.guardarCliente(datos['nombre'],datos['apellido'],datos['tipo_cedula'], datos['cedula'], datos['fecha_nacimiento'],
    datos['telefono'], datos['correo'], datos['idestado'], datos['idmunicipio'], datos['idparroquia'], datos['social'], datos['social'],
    datos['facturable'], this.userid).subscribe(
      (res : any) => {
        if(res === true){
          this.ngOnDestroy();
          this._snackBar.open('Cliente registrado con exito', 'ok',{duration: 3000});
        }else{
          this._snackBar.open('Error al añadir al cliente', 'ok',{duration: 3000});
        }
        this.loading = false;
      }, (err : any) => {
        console.log(err);
        this.loading = false;
      }
    );
  }



}
