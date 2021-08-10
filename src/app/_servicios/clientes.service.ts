import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(
    private http:HttpClient,
    private loginS: LoginService
  ) { }

  traerClientes(id:number):Observable<any[]>{
    return this.http.get<any[]>(this.loginS.API_URI+"clientes1/"+id);
  }

  //1-> idusuario de la sesion, 2-> Url 1 o 2, 3-> tipo filtro o sea 1
  traerClientes1(id:number,id2:number,tipo:number){
    return this.http.post(this.loginS.API_URI+"clientes2/",{id,id2,tipo});
  }

  traerClientesApi(id:number,id2:number,tipo:number,opt:string){
    return this.http.post(this.loginS.API_URI2+"clientes.php",{id,id2,tipo,opt});
  }

  traerEstados(){
    return this.http.post(this.loginS.API_URI2+"clientes.php",{
      opt: 'obtener_estados'
    })
  }

  traerMunicipios(idestado: any){
    return this.http.post(this.loginS.API_URI2+"clientes.php",{
      opt: 'obtener_municipios',
      idestado: idestado
    })
  }

  traerParroquia(idmunicipio: any){
    return this.http.post(this.loginS.API_URI2+"clientes.php",{
      opt: 'obtener_parroquia',
      idmunicipio: idmunicipio
    })
  }

  guardarCliente(nombres:string,apellidos:string,kni:string,dni:string,fecha:string,numero:string,email:string,estado:number,municipio:number,parroquia:number,social:any,direccion:string,facturable:boolean,id_user:number){
    return this.http.post(this.loginS.API_URI+"guardarCliente",{nombres,apellidos,kni,dni,fecha,numero,email,estado,municipio,parroquia,social,direccion,facturable,id_user})
  }

  traerDatosCliente(id: number){
    return this.http.get(this.loginS.API_URI+"cliente/"+id);
  }

  traerDatosClienteApi(idCliente: number){
    return this.http.post(this.loginS.API_URI2+"clientes.php/",{
      opt: 'obtener_cliente',
      id: idCliente
    });
  }

  
  obtenerServiciosClientes(idCliente: number){
    return this.http.get(this.loginS.API_URI+'clientover/'+idCliente);
  }

  obtenerServiciosClientes2(idCliente: number){
    return this.http.post(this.loginS.API_URI2+'clientes.php',{
      opt: 'obtener_cliente_servicio',
      id: idCliente
    });
  }

  obtenerHistorialClientes(idCliente: number){
    return this.http.post(this.loginS.API_URI2+'clientes.php',{
      opt: 'obtener_cliente_historial',
      id: idCliente
    });
  }

  obtenerFacturacionesClientes(idCliente: number){
    return this.http.post(this.loginS.API_URI2+'clientes.php',{
      opt: 'obtener_cliente_facturaciones',
      id: idCliente
    });
  }

  obtenerBancesYexoneracionesClientes(idCliente: number, clienteSocial: number){
    return this.http.post(this.loginS.API_URI2+'clientes.php',{
      opt: 'obtener_cliente_balances_y_exoneraciones',
      id: idCliente,
      social: clienteSocial
    });
  }

  obtenerTicketsClientes(idCliente: number){
    return this.http.post(this.loginS.API_URI2+'clientes.php',{
      opt: 'obtener_cliente_ticket',
      id: idCliente
    });
  }

}