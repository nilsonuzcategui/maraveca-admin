import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClientesComponent } from './clientes/clientes.component';
import { DetallesClienteComponent } from './clientesCompo/detalles-cliente/detalles-cliente.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { PlanesComponent } from './planes/planes.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: InicioComponent, canActivate: [AuthGuard]},
  {path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  {path: 'cliente-detalle/:id', component: DetallesClienteComponent, canActivate: [AuthGuard]},
  {path: 'planes', component: PlanesComponent, canActivate: [AuthGuard]},
  {path: 'facturacion', component: FacturacionComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
