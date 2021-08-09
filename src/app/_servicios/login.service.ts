import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //LOCALHOST
  API_URI = 'http://127.0.0.1:8000/api/';
  API_URI2 = 'http://localhost/maraveca-api/';

  //EXTERNO
  // API_URI = 'http://201.249.147.139/maraveca/public/index.php/api/';
  // API_URI2 = 'https://facturacion.maraveca.net/api/';

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string){
    return this.http.post(this.API_URI+'users/login/'+username+'/'+password, JSON.stringify({ username: username, password: password }));

  }

  obtenerPermisos(iduser: any){
    return this.http.get(this.API_URI+'users/'+iduser+'/permission');
  }

  //ejemplo
  preguntasRespuestas(data: any){
    return this.http.post(`${this.API_URI}/preguntas-respuestas.php`, data);
  }
}
