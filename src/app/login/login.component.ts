import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { LoginService } from '../_servicios/login.service';


export interface loginForm {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() eventoIniciaSesion = new EventEmitter();

  login: loginForm = {
    username: '',
    password: ''
  };

  loading: boolean = false;
  error: boolean = false;
  errorMensaje: string = '';
  currentUser: any;
  Usuario: any;

  constructor(
    private loginServicio: LoginService,
    public auth: AuthGuard,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onSubmit(){
    this.loading = true;
    this.error = false;
    if (this.login.username != '') {
      if (this.login.password != '') {
        let respuesta = this.loginServicio.login(this.login.username, this.login.password).subscribe(
          (res : any) => {
            let use1 = res[0];
            if (use1 === undefined) {
              this.error = true;
              this.errorMensaje = 'Usuario/Contraseña Incorrecta.';
            }else{
              sessionStorage.setItem('currentUser', JSON.stringify(use1));
              this.currentUser = sessionStorage.getItem('currentUser');
              this.Usuario = this.currentUser;
              this.loginServicio.obtenerPermisos(use1['id_user']).subscribe(
                (res : any) => {
                  let arrayPermisos: any[] = res;
                  sessionStorage.setItem('permissions', JSON.stringify(arrayPermisos));
                  arrayPermisos.forEach(element => {
                    this.auth.perm.push(element['perm']);
                  });

                  //TODO BIEN - MANDAR AL INICIO
                  window.location.href = "/";
                },(err : any) => {
                  console.log(err);
                  this.loading = false;
                });
            }
            console.log(use1);
            this.loading = false;
          },
          (err : any) => {
            console.log(err);
            this.loading = false;
          }
        );
      }else{
        this.loading = false;
        this.error = true;
        this.errorMensaje = 'La contraseña es obligatoria';
      }
    }else{
      this.loading = false;
      this.error = true;
      this.errorMensaje = 'El usuario es obligatorio';
    }
    
  }

}
