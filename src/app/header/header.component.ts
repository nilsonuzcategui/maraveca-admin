import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import { LoginService } from '../_servicios/login.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() eventoToggle = new EventEmitter();
  autoupdate = true;
  dash_t = [];
  dash = [];
  averias: number = 0;
  total: number = 0;
  balance: number = 0;
  balance_in: number = 0;
  instalaciones: number = 0;
  tickets: number = 0;
  factibilidades: number = 0;
  otrost: number = 0;
  alarmas: any = []
  alerta: number = 0
  cantidadAlertas: number = 0;

  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  iduser = 0;

  constructor(
    public usuario: AuthGuard,
    private loginServicio: LoginService,
    private http: HttpClient
  ) { 
    
  }

  ngOnInit(): void {
    let userData = JSON.parse(<any>localStorage.getItem('currentUser'));

    this.iduser = userData['id_user'];
    this.nombreUsuario = userData['nombre_user'];
    this.apellidoUsuario = userData['apellido_user'];
    
    if (this.usuario.currentUser) {
      this.refresh(true);
    }
    // IntervalObservable.create(10000)
    //   .takeWhile(() => (this.usuario.currentUser))
    //   .subscribe(() => {
    //     this.refresh(false);
    //   });

    this.notificacion();
  }


  refresh(test: boolean) {
    this.http.get(this.loginServicio.API_URI + 'dash/', { params: { uid: this.iduser } })

      .subscribe((data) => {
        // this.dash_t = data.json();
        // this.dash = this.dash_t;
        // this.total = data.json().total;
        // this.averias = data.json().averias;
        // this.instalaciones = data.json().instalaciones;
        // this.tickets = data.json().tickets;
        // this.balance = data.json().balance;
        // this.factibilidades = data.json().factibilidades;
        // this.otrost = data.json().otrost;
        // this.balance_in = data.json().balance_in;
      });
    this.notificacion();
  }

  notificacion() {
    // this.alarmarService.notificacion().subscribe(res => { console.log(res), this.alarmas = res }, err => console.log(err))
  }

  ToggleNav(){
    this.eventoToggle.emit();
  }

  cerrarSesion(){
    localStorage.removeItem('currentUser');
    localStorage.removeItem('permissions');
    window.location.href = "/login";
  }
}
