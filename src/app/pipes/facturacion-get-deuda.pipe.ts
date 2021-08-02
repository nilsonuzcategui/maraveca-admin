import { Pipe, PipeTransform } from '@angular/core';
import { FacturacionService } from '../_servicios/facturacion.service';

@Pipe({
  name: 'facturacionGetDeuda'
})
export class FacturacionGetDeudaPipe implements PipeTransform {

  constructor(
    private _facturacion: FacturacionService
  ){

  }

  transform(idcliente: any): any {

    // this._facturacion.traerFacturaciones()
    return null;
  }

}
