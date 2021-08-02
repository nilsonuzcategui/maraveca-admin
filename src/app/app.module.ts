import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { ClientesComponent } from './clientes/clientes.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AggClienteComponent } from './clientesCompo/agg-cliente/agg-cliente.component';
import { DetallesClienteComponent } from './clientesCompo/detalles-cliente/detalles-cliente.component';
import { PlanesComponent } from './planes/planes.component';
import { TablasPlanesComponent } from './planesComponentes/tablas-planes/tablas-planes.component';
import { TablaMegasContratadosComponent } from './planesComponentes/tabla-megas-contratados/tabla-megas-contratados.component';
import { ActualizarDolarComponent } from './planesComponentes/actualizar-dolar/actualizar-dolar.component';
import { AgregarPlanComponent } from './planesComponentes/agregar-plan/agregar-plan.component';
import { EditarPlanComponent } from './planesComponentes/editar-plan/editar-plan.component';
import { FacturacionComponent } from './facturacion/facturacion.component';
import { FacturacionGetDeudaPipe } from './pipes/facturacion-get-deuda.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    HeaderComponent,
    ClientesComponent,
    AggClienteComponent,
    DetallesClienteComponent,
    PlanesComponent,
    TablasPlanesComponent,
    TablaMegasContratadosComponent,
    ActualizarDolarComponent,
    AgregarPlanComponent,
    EditarPlanComponent,
    FacturacionComponent,
    FacturacionGetDeudaPipe
  ],
  entryComponents: [
    AggClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatMenuModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
