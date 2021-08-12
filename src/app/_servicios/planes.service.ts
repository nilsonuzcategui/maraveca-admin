import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {

  constructor(
    private http:HttpClient,
    private loginS: LoginService
  ) { }

  traerClientes(userid:any, plan: any):Observable<any>{
    return this.http.get(this.loginS.API_URI+'planes/', {params:{responsable: userid, plan: plan}});
  }

  obtenerPrecioDolar():Observable<any>{
    return this.http.post(this.loginS.API_URI2+'planes.php',{
      opt: 'obtener_precio_dolar'
    });
  }

  actualizarDolar(datos: any):Observable<any>{
    return this.http.post(this.loginS.API_URI+'planes/update',datos);
  }

  agregarPlan(datos: any):Observable<any>{
    return this.http.post(this.loginS.API_URI+'planes',datos);
  }

  editarPlan(idplan: any, datos: any):Observable<any>{
    return this.http.put(this.loginS.API_URI+'planes/'+idplan, datos);
  }

  obtenerPlanes(idtipoPlan: number):Observable<any>{
    return this.http.post(this.loginS.API_URI2+'planes.php',{
      opt: 'obtener_planes_segun_su_tipo',
      idtipo: idtipoPlan
    });
  }

  traerCajaDistribucion():Observable<any>{
    return this.http.post(this.loginS.API_URI2+"planes.php",{
      opt: 'obtener_cajas_de_distribucion'
    });
  }

}
