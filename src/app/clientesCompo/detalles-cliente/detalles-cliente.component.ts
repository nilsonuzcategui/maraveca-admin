import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/_servicios/clientes.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css']
})
export class DetallesClienteComponent implements OnInit {

  //VARIABLES PARA DATOS PERSONALES
  idusuario: any = this._route.snapshot.paramMap.get('id');
  registerForm = this.formBuilder.group({
    userid: [{value: this.idusuario, disabled: true}, Validators.required],
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

  constructor(
    private _route: ActivatedRoute,
    private _clientes: ClientesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this._clientes.traerDatosCliente(this.idusuario).subscribe(
      (res: any) => {
        if (res.length > 0) {
          let datos = res[0]
          console.log(datos);
          //Seteo de variables
          this.registerForm = this.formBuilder.group({
            userid: [{value: this.idusuario, disabled: true}, Validators.required],
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
        this.loading = false;
      },(err: any) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

}