import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from 'src/app/_servicios/clientes.service';
import { PlanesService } from 'src/app/_servicios/planes.service';

@Component({
  selector: 'app-popup-editar-servicio',
  templateUrl: './popup-editar-servicio.component.html',
  styleUrls: ['./popup-editar-servicio.component.css']
})
export class PopupEditarServicioComponent implements OnInit {

  groupForm = this.formBuilder.group({});

  loadingForm: boolean = true;

  arrayPlan = [];
  arrayCajas = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    private MatDialogRef: MatDialogRef<PopupEditarServicioComponent>,
    private _snackBar: MatSnackBar,
    private _cliente: ClientesService,
    private _planes: PlanesService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    let data = this.data
    this.groupForm = this.formBuilder.group({
      cliente_srv: [data.cliente_srv, Validators.required],
      kind: [data.kind, Validators.required],
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      social: [data.social],
      serie_srv: [data.serie_srv, Validators.required], //tipo Cliente
      stat_srv: [data.stat_srv, [Validators.required]], //estado del servicio
      id_plan: [data.id_plan, Validators.required], //ID plan de megas del servicio
      tipo_plan: [data.tipo_plan, Validators.required], //plan de megas del servicio
      tipo_srv: [data.tipo_srv, Validators.required], //si es fibra o normal
      name_plan: [data.name_plan, Validators.required],
      ip_srv: [{value: data.ip_srv, disabled: true}],
      nombre_caja: [data.nombre_caja],
      ap_srv: [data.ap_srv], //servicio Fibra
      nombre_equipo: [data.nombre_equipo],
      serial_srv: [data.serial_srv],
      nombre_ap: [data.nombre_ap],
      nombre_manga: [data.nombre_manga],
      user_comision_serv: [data.user_comision_serv],
      porcentaje_comision_serv: [data.porcentaje_comision_serv],
      comment_srv: [data.comment_srv],
      costo_instalacion_srv: [data.costo_instalacion_srv],
      credito_srv: [data.credito_srv],
      instalacion_srv: [data.instalacion_srv],
      start_srv: [data.start_srv],
      id_srv: [data.id_srv] //id del servicio
    });
    this.cambiandoTipoPlan(this.data.tipo_plan);

    if(data.tipo_srv == 2){
      this.obtenerCajas();
    }
  }

  ngOnDestroy(){
    this.MatDialogRef.close(this.groupForm.value);
  }

  obtenerCajas(){
    this._planes.traerCajaDistribucion().subscribe(
      (res: any) => {
        this.arrayCajas = res['cuerpo'];
        console.log(res);
        
      },(err: any) => {
        console.log(err);
      },() => {
        this.loadingForm = false;
      }
    );
  }

  cambiandoTipoPlan(e: any){
    this.loadingForm = true;
    let tipoPlan;
    if(e['value']){
      tipoPlan = e['value'];
    }else{
      tipoPlan = e;
    }
    this._planes.obtenerPlanes(tipoPlan).subscribe(
      (res: any) => {
        this.arrayPlan = res['cuerpo'];
      },(err: any) => {
        console.log(err);
      },() => {
        this.loadingForm = false;
      }
    );
  }

  submitForm(){
    alert('submit');
  }

}
