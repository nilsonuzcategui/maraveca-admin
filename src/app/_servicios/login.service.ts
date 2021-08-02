import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API_URI = 'http://127.0.0.1:8000/api/';
  API_URI2 = 'http://localhost/maraveca-api/';


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
