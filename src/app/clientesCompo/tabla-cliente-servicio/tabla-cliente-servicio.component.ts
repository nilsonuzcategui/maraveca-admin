import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PopupEditarServicioComponent } from '../popup-editar-servicio/popup-editar-servicio.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiciosService } from 'src/app/_servicios/servicios.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AlertaPreguntaCerradaComponent } from 'src/app/componentes/alerta-pregunta-cerrada/alerta-pregunta-cerrada.component';

@Component({
  selector: 'app-tabla-cliente-servicio',
  templateUrl: './tabla-cliente-servicio.component.html',
  styleUrls: ['./tabla-cliente-servicio.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TablaClienteServicioComponent implements OnInit {
  @Input() data: any;
  dataSource = new MatTableDataSource<any>();
  arrayDatos: any = [];
  expandedElement: any;
  columnsToDisplay = ['id_srv', 'name_plan', 'direccion'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  LoadingStatus: boolean = false;

  constructor(
    private MatDialog: MatDialog,
    private _servicios: ServiciosService,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.dataSource = new MatTableDataSource<any>(changes.data.currentValue.data);
      this.arrayDatos = changes.data.currentValue.data;
      this.ngAfterViewInit();
    }
  }

  editarServicio(datos: any) {
    let dialogRef = this.MatDialog.open(PopupEditarServicioComponent,
      {
        width: '900px',
        data: datos
      });

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result);

      }
    );
  }


  cambiarEstadoServicio(datos: any, idestado: number) {
    this.LoadingStatus = true;
    let idServicio = datos['id_srv'];
    let ipServicio = datos['ip_srv'];
    let tipo_srv = datos['tipo_srv'];
    let ip_api = datos['ip_api'];
    let userMK = datos['user_srvidor'];
    let passMK = datos['password_srvidor'];

    // this._bottomSheet.open(AlertaPreguntaCerradaComponent);

    var r = confirm("¿Seguro que quiere cambiar el estado del servicio ?");
    if (r == true) {
      // this._servicios.modificarEstadoServicio(idServicio, ipServicio, idestado, tipo_srv, ip_api, userMK, passMK).subscribe(
      //   (res: any) => {
      //     console.log(res);
      //   },(err: any) => {
      //     console.log(err);
      //   },() => {
      //     this.LoadingStatus = false;
      //   }
      // );

      //MODIFICAR ICONO
      let indice: any = this.arrayDatos.findIndex((d: any) => d.id_srv == datos.id_srv);
      this.arrayDatos[indice]['stat_srv'] = idestado;
      this.dataSource = new MatTableDataSource<any>(this.arrayDatos);
      this.dataSource._updateChangeSubscription();
      this.LoadingStatus = false;
    } else {
      this.LoadingStatus = false;
    }


  }

  openBottomSheet(): void {
    this._bottomSheet.open(AlertaPreguntaCerradaComponent);
  }
}
