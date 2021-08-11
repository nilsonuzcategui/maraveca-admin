import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from 'src/app/_servicios/clientes.service';

@Component({
  selector: 'app-popup-editar-servicio',
  templateUrl: './popup-editar-servicio.component.html',
  styleUrls: ['./popup-editar-servicio.component.css']
})
export class PopupEditarServicioComponent implements OnInit {

  groupForm = this.formBuilder.group({});

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    private _cliente: ClientesService,
    private MatDialogRef: MatDialogRef<PopupEditarServicioComponent>,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.groupForm = this.formBuilder.group({
      idcliente: ['', Validators.required],
      kind: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      social: [''],
      serie_srv: [''], //tipo Cliente
      stat_srv: ['', [Validators.required, Validators.email]], //estado del servicio
      tipo_plan: ['', Validators.required],
      tipo_srv: ['', Validators.required],
      name_plan: ['', Validators.required],
      ip_srv: [null],
      nombre_caja: [''],
      ap_srv: [false],
      nombre_equipo: [''],
      serial_srv: [''],
      nombre_ap: [''],
      nombre_manga: [''],
      user_comision_serv: [''],
      porcentaje_comision_serv: [''],
      comment_srv: [''],
      costo_instalacion_srv: [''],
      credito_srv: [''],
      instalacion_srv: [''],
      start_srv: [''],
    });

  }

}
