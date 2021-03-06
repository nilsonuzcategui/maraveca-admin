import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturacionService {

  constructor(
    private http:HttpClient,
    private loginS: LoginService
  ) { }

  traerFacturaciones(iduser:number, total: number, numeroFilas: number, numeroFilasObtenidas: number, sql: string):Observable<any[]>{
    return this.http.post<any[]>(this.loginS.API_URI2+"facturacion.php",
    {
      opt: 'obtener_facturaciones',
      iduser: iduser,
      total: total,
      numeroFilas: numeroFilas,
      numeroFilasObtenidas: numeroFilasObtenidas,
      sql: sql
    });
  }

  traerFacturacionesNumFilas(iduser:number, porcentaje: number, filtroFecha: string):Observable<any[]>{
    return this.http.post<any[]>(this.loginS.API_URI2+"facturacion.php",
    {
      opt: 'obtener_facturaciones_total_numeros',
      iduser: iduser,
      porcentaje: porcentaje,
      filtroFecha: filtroFecha
    });
  }

  traerSaldosClientes(idcliente:number):Observable<any[]>{
    return this.http.post<any[]>(this.loginS.API_URI2+"facturacion.php",
    {
      opt: 'obtener_saldos',
      idcliente: idcliente
    });
  }

  obtenerMetodosPagos():Observable<any[]>{
    return this.http.post<any[]>(this.loginS.API_URI2+"facturacion.php",
    {
      opt: 'obtener_metodos_pagos'
    });
  }

  obtenerPrecioDolar():Observable<any>{
    return this.http.post(this.loginS.API_URI2+'planes.php',{
      opt: 'obtener_precio_dolar'
    });
  }

  registrarPagoFacturable(datos: any):Observable<any>{
    return this.http.post(this.loginS.API_URI+"pagoclient",datos)
  }

  registrarPagoNoFacturable(
      metodo:any, referencia:string, fecha:any, conversion:number, monto:number,usuario:number,cliente:number
    ):Observable<any>{
    return this.http.post(this.loginS.API_URI+"registrarPago",{metodo,referencia,fecha,conversion,monto,usuario,cliente})
  }


}
