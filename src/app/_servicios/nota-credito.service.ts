import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaCreditoService {
  constructor(
    private http: HttpClient,
    private _login: LoginService
  ) { }

  traerNotasDeCredito(id:number):Observable<any[]>{
    return this.http.get<any[]>(this._login.API_URI+"notasCredito/"+id);
  }

  // traerNotasDeCreditoApi(idCliente:number):Observable<any[]>{
  //   return this.http.post<any[]>(this._login.API_URI2+"cliente.php/",{
  //     opt: 'obtener_cliente_balances_y_exoneraciones',
  //     id: idCliente,
  //   });
  // }

  traerProductos(id:number):Observable<any[]>{
    return this.http.get<any[]>(this._login.API_URI+"productosNota/"+id)
  }

  guardarNota(tipo_nota: any ,cliente:number,factura:number,producto:number,nota:number){
    return this.http.post(this._login.API_URI+"notaCredito",{tipo_nota,cliente,factura,producto,nota})
  }

  guardarPagoNota(datos:any,id_nota:number,id_usuario:number){
    return this.http.post(this._login.API_URI+"guardarPagoNota",{datos,id_nota,id_usuario})
  }
}
