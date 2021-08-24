import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  groupForm = this.formBuilder.group({});
  //Variables para dinamismo
  loadingForm: boolean = false;
  arrayMetodos = [];
  precioDolar = 0;
  mensajeError = '';
  errorBoolean: boolean = false;

  //Variables para formulario
  metodoDePago = '';
  referenciaPago = '';
  fechaPago = this.pipes.transform(new Date(), 'yyyy-MM-dd');
  MontoPago = 0;

  constructor(
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
    this.MatDialogRef.close();
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
          console.log('Metodo ->', this.metodoDePago);
          console.log('Referencia ->', this.referenciaPago);
          console.log('Fecha ->', this.fechaPago);
          console.log('Monto ->', this.MontoPago);
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
