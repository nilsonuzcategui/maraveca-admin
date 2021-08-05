import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'balTipTransform'
})
export class BalTipTransformPipe implements PipeTransform {

  transform(value: number): string {
    let retorno: string;
    if (value == 1) {
      retorno = 'Transferencia BOD';
    }else if (value == 2) {
      retorno = 'Transferencia Banesco';
    }else if (value == 3) {
      retorno = 'Transferencia Venezuela';
    }else if (value == 6) {
      retorno = 'Transferencia Bicentenario';
    }else if (value == 9) {
      retorno = 'Zelle';
    }else if (value == 10) {
      retorno = 'Wire Transfer';
    }else if (value == 11) {
      retorno = 'Efectivo en dolar $';
    }else if (value == 18) {
      retorno = 'Banesco Panamá';
    }else{
      retorno = '';
    }

  
    return retorno;
  }

}
