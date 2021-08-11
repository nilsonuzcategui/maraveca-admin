import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    
  }

}
