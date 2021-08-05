import { Component, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | any;
  title = 'nueva-administracion';
  isToogleNav = false;
  isHeader = true;

  p:any;

  //PERMISOS
  permisoCliente: boolean = false;
  permisoPlanes: boolean = false;
  
  constructor( ){
    if (localStorage.getItem('currentUser')) {
      this.isHeader = true;
    }else{
      this.isHeader = false;
    }
  }
  ngOnInit(): void {
    this.p = JSON.parse(<any>localStorage.getItem('permissions'));
    console.log(this.p.filter((x:any) => x.perm == 'clientes')[0]['perm']);
    
    if (this.p.filter((x:any) => x.perm == 'clientes').length > 0) {
      this.permisoCliente = true;
    }

    if (this.p.filter((x:any) => x.perm == 'planes').length > 0) {
      this.permisoPlanes = true;
    }
  }

  reason = '';

  close(reason: string) {
  
    this.reason = reason;
    this.sidenav.close();
  }
  shouldRun = true;

  ToogleMenu(){
    this.sidenav.toggle();
  }
  IniciaSesionEvent(){
    this.isHeader = true;
    console.log('evento de mostrar head');
    
  }

}
