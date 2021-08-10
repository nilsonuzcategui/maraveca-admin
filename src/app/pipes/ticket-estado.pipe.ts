import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketEstado'
})
export class TicketEstadoPipe implements PipeTransform {

  transform(value: any): string {
    let retorno: string = '';
    if (value == 1) {
      
    }else if(value == 2){
      retorno = 'Cerrado';
    }
    return retorno;
  }

}
