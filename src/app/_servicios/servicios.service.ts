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

  obtenerEquiposInstalacion(tipoServicio: number):Observable<any>{
    return this.http.post(this.loginS.API_URI2+'servicios.php',{
      opt: 'obtener_equipos_instalacion',
      tipo_srv: tipoServicio
    });
  }

  obtenerCeldasPractica(){
    return this.http.post(this.loginS.API_URI2+'servicios.php',{
      opt: 'obtener_celdas_practicas'
    });
  }

  obtenerSerialesEquipo(idZona: number, modelo: string):Observable<any>{
    return this.http.post(this.loginS.API_URI2+'servicios.php',{
      opt: 'obtener_seriales_equipos',
      idzona: idZona,
      modelo: modelo,
    });
  }


  seeeriiiaallleesss(idZona: any, modelo: string):Observable<any>{
    return this.http.post(this.loginS.API_URI2+'servicios.php',{
      opt: 'obtener_seriales_equipos',
      idzona: idZona,
      modelo: modelo
    });
  }

  obtenerApsPractica():Observable<any>{
    return this.http.post(this.loginS.API_URI2+'servicios.php',{
      opt: 'obtener_aps'
    });
  }

  obtenerUsuariosComisiones():Observable<any>{
    return this.http.post(this.loginS.API_URI2+'servicios.php',{
      opt: 'obtener_usuarios_comisiones'
    });
  }


}
