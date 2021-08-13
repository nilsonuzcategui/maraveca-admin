import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientesService } from 'src/app/_servicios/clientes.service';
import { PlanesService } from 'src/app/_servicios/planes.service';
import { ServiciosService } from 'src/app/_servicios/servicios.service';

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
  arrayEquipos = [];
  arrayCeldas = [];
  arraySeriales = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    private MatDialogRef: MatDialogRef<PopupEditarServicioComponent>,
    private _snackBar: MatSnackBar,
    private _cliente: ClientesService,
    private _planes: PlanesService,
    private _servicios: ServiciosService
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
    
    //obtener para que el formulario sirva
    this.obtenerEquipos(this.data.tipo_srv);
    this.obtenerCeldas();
    if(data.tipo_srv == 2){
      this.obtenerCajas();
    }

    //eventos de cambios
    this.cambiandoTipoPlan(this.data.tipo_plan);
    this.cambiandoEquipo(this.data.nombre_equipo);
  }

  ngOnDestroy(){
    this.MatDialogRef.close(this.groupForm.value);
  }

  obtenerCajas(){
    this._planes.traerCajaDistribucion().subscribe(
      (res: any) => {
        this.arrayCajas = res['cuerpo'];        
      },(err: any) => {
        console.log(err);
      },() => {
        this.loadingForm = false;
      }
    );
  }

  obtenerCeldas(){
    this._servicios.obtenerCeldasPractica().subscribe(
      (res: any) => {
        this.arrayCeldas = res['cuerpo'];        
      },(err: any) => {
        console.log(err);
      }
    );
  }

  obtenerEquipos(tipoServicio: number){
    this._servicios.obtenerEquiposInstalacion(tipoServicio).subscribe(
      (res: any) => {
        this.arrayEquipos = res['cuerpo'];
      }, (err: any) => {
        console.log(err);
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

  cambiandoEquipo(e: any){ //obtener seriales
    let nombreEquipo;
    if(e['value']){
      nombreEquipo = e['value'];
    }else{
      nombreEquipo = e;
    }
    let apSeleccionada: any;
    let equipoSeleccionado: any;
    let celdaSeleccionada: any;
    let zoneSeleccionada: any;

    if(this.data['tipo_srv'] == 1){ //inalambrico
      apSeleccionada = this.data['ap_srv'];
      equipoSeleccionado = nombreEquipo;

      this.arrayCeldas.forEach((element: any) => {
        if (element.id_celda == this.data["celda_ap"]) {
          celdaSeleccionada = element.id_celda
        }
      });

      if(
        celdaSeleccionada==16 || celdaSeleccionada==17 || celdaSeleccionada==18 || celdaSeleccionada==19 || celdaSeleccionada==20 || celdaSeleccionada==21 ||
        celdaSeleccionada==22 || celdaSeleccionada==30 || celdaSeleccionada==32 || celdaSeleccionada==34 || celdaSeleccionada==37
        ){
          zoneSeleccionada = 1;
      }

      if(
        celdaSeleccionada==3 || celdaSeleccionada==6 || celdaSeleccionada==7 || celdaSeleccionada==8 || celdaSeleccionada==9 || celdaSeleccionada==10 ||
        celdaSeleccionada==11 || celdaSeleccionada==12 || celdaSeleccionada==15 || celdaSeleccionada==28
        ){
          zoneSeleccionada = 3;
      }

      if(
        celdaSeleccionada==14 || celdaSeleccionada==24 || celdaSeleccionada==25 || celdaSeleccionada==29
        ){
          zoneSeleccionada = 2;
      }

      if(
        celdaSeleccionada==2 || celdaSeleccionada==4 || celdaSeleccionada==5 || celdaSeleccionada==13 || celdaSeleccionada==31 || celdaSeleccionada==40 ||
        celdaSeleccionada==41
        ){
          zoneSeleccionada = 4;
      }

      if(
        celdaSeleccionada==35 || celdaSeleccionada==36 || celdaSeleccionada==39
        ){
          zoneSeleccionada = 5;
      }
      
      // console.log('zona por inalambrico --> ',zoneSeleccionada);
      // console.log('celda por inalambrico --> ',zoneSeleccionada);

    }else{ //fibre
      zoneSeleccionada = this.data["zona_caja"];
      equipoSeleccionado = nombreEquipo;

      console.log('zona por fibra --> ',zoneSeleccionada);
    }

    //consulta a la BD
    


    // this._servicios.seeeriiiaallleesss(zoneSeleccionada, equipoSeleccionado).subscribe(
    //   (res: any) => {
    //     console.log('seriales -> ',res['cuerpo']);
        
    //     this.arraySeriales = res['cuerpo'];
    //   }, (err: any) => {
    //     console.log(err);
    //   },() => {
    //     console.log('zona pasada al http --> ',zoneSeleccionada);
        
    //   }
    // );
  }

  submitForm(){
    alert('submit');
  }

}
