import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(
    private http:HttpClient,
    private loginS: LoginService
  ) { }

  modificarEstadoServicio(
      idServicio: number, 
      ipServicio: string, 
      idEstado: number, 
      tipoServicio: number, 
      ip_api: string,
      userMK: string,
      passMK: string
    ):Observable<any>{
    return this.http.post(this.loginS.API_URI2+"servicios.php",{
      opt: 'modificar_estado_servicio',
      id_srv: idServicio,
      ip_srv: ipServicio,
      status: idEstado,
      tipo_srv: tipoServicio,
      ip_api: ip_api,
      userMK: userMK,
      passMK: passMK
    });
  }
}
