import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/_servicios/clientes.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotaCreditoService } from 'src/app/_servicios/nota-credito.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css'],
})

export class DetallesClienteComponent implements OnInit, AfterViewInit, OnDestroy {

  peticionHttp: Subscription = new Subscription; //peticion http
  peticionHttpDatosClientes: Subscription = new Subscription; //peticion http


  @ViewChild(MatAccordion) accordion: MatAccordion | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatPaginator) paginatorBalances: MatPaginator | any;
  columnasServicios: string[] = ['id', 'name_plan', 'direccion'];
  


  dataSource = new MatTableDataSource<any>();
  
  


  //VARIABLES PARA DATOS PERSONALES
  idcliente: any = this._route.snapshot.paramMap.get('id');
  registerForm = this.formBuilder.group({
    userid: [{value: this.idcliente, disabled: true}, Validators.required],
    tipo_cedula: [{value: 'V', disabled: true}, Validators.required],
    cedula: [{value: '', disabled: true}, Validators.required],
    nombre: [{value: '', disabled: true}, Validators.required],
    apellido: [{value: '', disabled: true}, Validators.required],
    fecha_nacimiento: [{value: '', disabled: true}],
    telefono: [{value: '', disabled: true}],
    correo: [{value: '', disabled: true}, [Validators.required, Validators.email]],
    idestado: [{value: '', disabled: true}, Validators.required],
    idmunicipio: [{value: '', disabled: true}, Validators.required],
    idparroquia: [{value: '', disabled: true}, Validators.required],
    social: [null],
    direccion: [{value: '', disabled: true}],
    facturable: [false],
  });

  //VARIABLES PARA DINAMISCO
  loading: boolean = true;

  //VARIABLES PARA EL CONTENIDO
  datosClientes: any;
  servicios: MatTableDataSource<any> = <any>[];
  historial = new MatTableDataSource<any>();
  balancePagosTabla = new MatTableDataSource<any>();
  numServicios: any;
  facturacion: any = [];
  notasCreditos: any = [];
  balance_in: any = [];
  balance: any = [];
  exoneraciones: any = [];
  exoneraciones_in: any = [];

  facturadoin = 0;
  facturado = 0;
  pagadoin = 0;
  pagado = 0;
  MontoNotadeCredito = 0;
  facturadoNotaCredito = 0;
  pagadodoNotaCredito = 0;
  MontoNotadeDebito = 0;
  facturadoNotaDebito = 0;
  pagadoNotaDebito = 0;

  denominacion_html = '';
  status_balance_html1 = 0;
  status_balance_html2 = 0;
  tipo_cliente_html = ' ';

  balac = 0;
  balac_$ = 0;
  balac_in = 0;

  

  constructor(
    private _route: ActivatedRoute,
    private _clientes: ClientesService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private _notaCredito: NotaCreditoService
  ) { }

  ngOnInit(): void {
    this.peticionHttpDatosClientes = this._clientes.traerDatosCliente(this.idcliente).subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.datosClientes = res[0]
          console.log(this.datosClientes);
          //Seteo de variables
          this.registerForm = this.formBuilder.group({
            userid: [{value: this.idcliente, disabled: true}, Validators.required],
            tipo_cedula: [{value: this.datosClientes['kind'], disabled: true}, Validators.required],
            cedula: [{value: this.datosClientes['dni'], disabled: true}, Validators.required],
            nombre: [{value: this.datosClientes['nombre'], disabled: true}, Validators.required],
            apellido: [{value: this.datosClientes['apellido'], disabled: true}, Validators.required],
            fecha_nacimiento: [{value: this.datosClientes['day_of_birth'], disabled: true}],
            telefono: [{value: this.datosClientes['phone1'], disabled: true}],
            correo: [{value: this.datosClientes['email'], disabled: true}, [Validators.required, Validators.email]],
            idestado: [{value: this.datosClientes['estado'], disabled: true}, Validators.required],
            idmunicipio: [{value: this.datosClientes['municipio'], disabled: true}, Validators.required],
            idparroquia: [{value: this.datosClientes['parroquia'], disabled: true}, Validators.required],
            social: [this.datosClientes['social']],
            direccion: [{value: this.datosClientes['direccion'], disabled: true}],
            facturable: [false],
          });

          //mostrar si es facturable o no facturable
          if(this.datosClientes['serie'] == 1){
            this.tipo_cliente_html = 'Facturable';
          }else{
            this.tipo_cliente_html = 'No Facturable';
          }
        }else{
          this._snackBar.open('Lo siento, no pudimos obtener los datos del cliente', 'ok', {
            duration: 4000,
          });
        }
      },(err: any) => {
        console.log(err);
       
      }
    );
    //buscar datos completos de servicios, historiales, ticket, todo.-.
    this.obtenerServiciosClientes();
  }

  ngAfterViewInit() {
    this.historial.paginator = this.paginator;
    this.balancePagosTabla.paginator = this.paginatorBalances;
  }

  obtenerServiciosClientes(){
    this.loading = true;
    this.peticionHttp = this._clientes.obtenerServiciosClientes(this.idcliente).subscribe(
      (res: any) =>{
        console.log(res);
        this.numServicios = res['servicios'].length;
        this.dataSource = new MatTableDataSource<any>(res['servicios']); //tabla principal de servicios
        this.historial = new MatTableDataSource<any>(res['history']);
        
        //facturacion para pagos y facturas
        this.facturacion = res['facturacion'];
        this.balance_in = res['balance_in'];
        this.balance = res['balance'];
        this.exoneraciones = res['exoneraciones'];
        this.exoneraciones_in = res['exoneraciones_in'];

        //balance de pagos y exoneraciones
        if(this.datosClientes['serie'] == 1){
          this.balancePagosTabla = new MatTableDataSource<any>(this.balance);
        }else{
          this.balancePagosTabla = new MatTableDataSource<any>(this.balance_in);
        }
        this.ngAfterViewInit();
        

        //obtener notas creditos del cliente
        this._notaCredito.traerNotasDeCredito(this.idcliente).subscribe(
          (res: any) => {
            console.log(res);
            this.notasCreditos = res;
            this.obtener_totales_para_cartas();
          },(err: any) => {
            console.log(err);
          }
        );
      },(err: any) => {
        console.log(err);
        this._snackBar.open('Error al obtener datos de los servicios', 'ok',{duration: 5000});
      },() => {
        this.loading = false;
        this.accordion.openAll();
      }
    );
  }

  obtener_totales_para_cartas(){
    var pagadoin_1 = 0
    var pagado_1 = 0
    var facturadoin_1 = 0
    var facturado_1 = 0
    let facturadoNotaDebito_1 = 0
    let facturadoNotaCredito_1 = 0
    let PagadoNotaDebito_1 = 0
    let PagadoNotaCredito_1 = 0
    var balac_1 = 0
    var balac_$_1 = 0
    var balac_in_1 = 0

    //array facturaciones
    this.facturacion.forEach((linea: any) => {
      if (linea.denominacion == '$') {
        if (linea.fac_status == 1) {
          pagadoin_1 = pagadoin_1 + linea.pagado;
          facturadoin_1 = facturadoin_1 + linea.monto;
        }
      }
    });
    this.facturacion.forEach((linea: any) => {
      if (linea.denominacion == 'Bs') {
        if (linea.fac_status == 1) {
          pagado_1 = pagado_1 + linea.pagado;
          facturado_1 = facturado_1 + linea.monto;
        }
      }
    });

    //obteniendo notas de creditos
    this.notasCreditos.forEach((e: any) => {
      if (e.tipo_nota == 1) {
        facturadoNotaDebito_1 = facturadoNotaDebito_1 + Number(e.monto_nota)
        PagadoNotaDebito_1 = PagadoNotaDebito_1 + Number(e.pagado)
      } else {
        facturadoNotaCredito_1 = facturadoNotaCredito_1 + Number(e.monto_nota)
        PagadoNotaCredito_1 = PagadoNotaCredito_1 + Number(e.pagado)
      }
    });

    //obteniendo balances
    this.balance_in.forEach((linea: any) => {
      if (linea.bal_rest_in > 0 && linea.bal_stat_in == 1) {
        balac_in_1 = balac_in_1 + Number(linea.bal_rest_in);
      }
    });

    this.balance.forEach((linea: any) => {
      if (linea.bal_rest > 0 && linea.bal_stat == 1 && (linea.bal_tip != 8 && linea.bal_tip != 9 && linea.bal_tip != 10 && linea.bal_tip != 11)) {
        balac_1 = balac_1 + Number(linea.bal_rest);
      } else if (linea.bal_rest > 0 && linea.bal_stat == 1 && (linea.bal_tip == 8 || linea.bal_tip == 9 || linea.bal_tip == 10 || linea.bal_tip == 11)) {
        balac_$_1 = balac_$_1 + Number(linea.bal_rest);
      }
    });

    //obteniendo Exoneraciones
    this.exoneraciones.forEach((linea: any) => {
      if (linea.bal_rest > 0 && linea.bal_stat == 1 && (linea.bal_tip != 8 && linea.bal_tip != 9 && linea.bal_tip != 10 && linea.bal_tip != 11)) {
        balac_1 = balac_1 + Number(linea.bal_rest);
      } else if (linea.bal_rest > 0 && linea.bal_stat == 1 && (linea.bal_tip == 8 || linea.bal_tip == 9 || linea.bal_tip == 10 || linea.bal_tip == 11)) {
        balac_$_1 = balac_$_1 + Number(linea.bal_rest);
      }
    });
    
    this.exoneraciones_in.forEach((linea: any) => {
      if (linea.bal_rest_in > 0 && linea.bal_stat_in == 1) {
        balac_in_1 = balac_in_1 + Number(linea.bal_rest_in);
      }
    })
    
    this.facturadoin = facturadoin_1;
    this.facturado = facturado_1;

    this.pagadoin = pagadoin_1;
    this.pagado = pagado_1;

    this.facturadoNotaDebito = facturadoNotaDebito_1;
    this.facturadoNotaCredito = facturadoNotaCredito_1;
    this.pagadoNotaDebito = PagadoNotaDebito_1;
    this.pagadodoNotaCredito = PagadoNotaCredito_1;

    this.MontoNotadeCredito = this.facturadoNotaCredito - this.pagadodoNotaCredito;
    this.MontoNotadeDebito = this.facturadoNotaDebito - this.pagadoNotaDebito;

    this.balac = balac_1;
    this.balac_$ = balac_$_1;
    this.balac_in = balac_in_1;

    if(this.datosClientes['social'] == 1){
      this.denominacion_html = 'Bs';
      //status balance 1
      if((this.facturado + this.MontoNotadeDebito ) > (this.pagado + this.MontoNotadeCredito)){
        this.status_balance_html1 = (this.facturado) - (this.pagado);
      }else if( (this.facturado + this.MontoNotadeDebito ) < (this.pagado + this.MontoNotadeCredito) ){
        this.status_balance_html1 = 0;
      }else if( (this.facturado + this.MontoNotadeDebito ) == (this.pagado + this.MontoNotadeCredito) ){
        this.status_balance_html1 = 0;
      }

      //status balance 2
      if( (this.pagado + this.MontoNotadeCredito) > (this.facturado + this.MontoNotadeDebito ) ){
        this.status_balance_html2 = this.balac;
      }else if( (this.pagado + this.MontoNotadeCredito) < (this.facturado + this.MontoNotadeDebito ) ){
        this.status_balance_html2 = 0;
      }else if( (this.pagado + this.MontoNotadeCredito) == (this.facturado + this.MontoNotadeDebito ) ){
        this.status_balance_html2 = 0;
      }
    }else{
      this.denominacion_html = '$';
      //status balance 1
      this.status_balance_html1 = (this.facturadoin - this.pagadoin);

      //status balance 2
      this.status_balance_html2 = this.balac_in;
    }
  } //fin funcion

  ngOnDestroy() {
    if (this.peticionHttp) {
      this.peticionHttp.unsubscribe();
    }
    if(this.peticionHttpDatosClientes){
      this.peticionHttpDatosClientes.unsubscribe();
    }
  }

}
