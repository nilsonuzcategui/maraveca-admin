import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacturacionService } from 'src/app/_servicios/facturacion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-popup-generar-factura',
  templateUrl: './popup-generar-factura.component.html',
  styleUrls: ['./popup-generar-factura.component.css'],
  providers: [DatePipe]
})
export class PopupGenerarFacturaComponent implements OnInit {

  idusuario: number = JSON.parse(<any>localStorage.getItem('currentUser'))['id_user'];

  groupForm = this.formBuilder.group({});
  //Variables para dinamismo
  loadingForm: boolean = false;
  arrayMetodos = [];
  precioDolar = 0;
  mensajeError = '';
  errorBoolean: boolean = false;
  respuestaComponente = false;

  //Variables para formulario
  metodoDePago = '';
  referenciaPago = '';
  fechaPago = this.pipes.transform(new Date(), 'yyyy-MM-dd');
  MontoPago = 0;

  idcliente = this.data.datosCliente['id'];
  clienteSerie = this.data.datosCliente['serie'];
  tablaFacturacion = this.data.tablaFacturacion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private MatDialogRef: MatDialogRef<PopupGenerarFacturaComponent>,
    private _snackBar: MatSnackBar,
    private _facturacion: FacturacionService,
    private pipes: DatePipe
  ) { }

  ngOnInit(): void {
    this.obtenerMetodos();
  }

  ngOnDestroy() {
    this.MatDialogRef.close(this.respuestaComponente);
  }

  obtenerMetodos() {
    this.loadingForm = true;
    this._facturacion.obtenerMetodosPagos().subscribe(
      (res: any) => {
        if (res['respuesta'] == 'exito') {
          this.arrayMetodos = res['cuerpo'];
          this.obtenerDolar();
        }
      }, (err: any) => {
        console.log(err);
        this._snackBar.open('Error al obtener metodos de pago', 'ok', { duration: 3000 });
      }
    );
  }

  obtenerDolar() {
    this._facturacion.obtenerPrecioDolar().subscribe(
      (res: any) => {
        this.precioDolar = Number(res['cuerpo']['valor']);
      }, (err: any) => {
        console.log(err);
        this._snackBar.open('Error obtener el precio del dolar', 'ok', { duration: 3000 });
      }, () => {
        this.loadingForm = false;
      }
    );
  }

  submitForm() {
    this.errorBoolean = false;
    if (this.metodoDePago != '') {
      if (this.fechaPago != '') {
        if (this.MontoPago > 0) {
          this.loadingForm = true;
          let fechaAux = Math.round(new Date(""+this.fechaPago+" 08:00:00").getTime()/1000.0);

          //mandar el monto correcto
          let montoFinal = 0;
          if (this.metodoDePago == '1' || this.metodoDePago == '2' || this.metodoDePago == '3' || this.metodoDePago == '6') {
            montoFinal = (this.MontoPago / this.precioDolar);
          }else{
            montoFinal = this.MontoPago;
          }

          //REGISTRAR PAGO
          if (this.clienteSerie == 1) {
            //REGISTRAR PAGO A CLIENTE NO FACTURABLE
            this.groupForm = this.formBuilder.group({
              bal_tip:  this.metodoDePago ,
              bal_monto:  this.MontoPago ,
              created_at:  fechaAux ,
              bal_comment:  this.referenciaPago ,
              bal_cli:  Number(this.idcliente) ,
            });
            this._facturacion.registrarPagoFacturable(this.groupForm.value).subscribe(
              (res: any) => {
                console.log(res);
                if (res == 200) {
                  this.respuestaComponente = true;
                  this.ngOnDestroy();
                }
              }, (err: any) => {
                console.log(err);
              }, () => {
                this.loadingForm = false;
              }
            );
          }else{
            //REGISTRAR PAGO A CLIENTE NO FACTURABLE
            this._facturacion.registrarPagoNoFacturable(
              this.metodoDePago, this.referenciaPago, fechaAux, montoFinal, this.MontoPago, this.idusuario, Number(this.idcliente)
            ).subscribe(
              (res: any) => {
                console.log(res);
                if (res['cliente']) {
                  this.respuestaComponente = true;
                  this.ngOnDestroy();
                }
              }, (err: any) => {
                console.log(err);
              }, () => {
                this.loadingForm = false;
              }
            );
          }
        }else{
          this.mensajeError = 'Es necesario una monto para procesar!';
          this.errorBoolean = true;
        }
      }else{
        this.mensajeError = 'Es necesario una fecha para el pago!';
        this.errorBoolean = true;
      }
    } else {
      this.mensajeError = 'Es necesario el metodo de pago!';
      this.errorBoolean = true;
    }

    
  }

}
