import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanesService } from 'src/app/_servicios/planes.service';

@Component({
  selector: 'app-actualizar-dolar',
  templateUrl: './actualizar-dolar.component.html',
  styleUrls: ['./actualizar-dolar.component.css']
})
export class ActualizarDolarComponent implements OnInit {

  loading: boolean = true;
  mensajeError: boolean = false;
  value = '';
  ultimaModificacion = '';

  constructor(
    private MatDialogRef: MatDialogRef<ActualizarDolarComponent>,
    private _planes: PlanesService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this._planes.obtenerPrecioDolar().subscribe(
      (res: any) => {
        if (res['respuesta'] == 'exito') {
          let datos = res['cuerpo'];
          this.value = datos['valor'];
          this.ultimaModificacion = datos['updated_at'];
        }
      },(err: any) => {
        console.log(err);
      }, () => {
        this.loading = false;
      }
    );
  }

  cerrarDialogo(){
    this.MatDialogRef.close(false);
  }

  actualizarDolarBoton(){
    this.loading = true;
    this.mensajeError = false;
    if (this.value != '') {
      let datosForm = {
        taza: this.value,
        responsable: JSON.parse(<any>localStorage.getItem('currentUser'))['id_user']
      }
      this._planes.actualizarDolar(datosForm).subscribe(
        (res: any) => {
          this._snackBar.open('Tasa actualizda con exito', 'ok',{duration: 3000});
          this.MatDialogRef.close(res);
        }, (err: any) => {
          console.log(err);
          this._snackBar.open('Error al actualizar la tasa', 'ok',{duration: 3000});
        }, () => {
          this.loading = false;
        }
      );
    }else{
      this.mensajeError = true;
    }

  }

}
