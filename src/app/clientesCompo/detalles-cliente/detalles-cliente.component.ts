import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/_servicios/clientes.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NotaCreditoService } from 'src/app/_servicios/nota-credito.service';
import {animate, state, style, transition, trigger} from '@angular/animations';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    position: 2,
    name: 'Helium',
    weight: 4.0026,
    symbol: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    position: 3,
    name: 'Lithium',
    weight: 6.941,
    symbol: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    position: 4,
    name: 'Beryllium',
    weight: 9.0122,
    symbol: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    position: 5,
    name: 'Boron',
    weight: 10.811,
    symbol: 'B',
    description: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    position: 6,
    name: 'Carbon',
    weight: 12.0107,
    symbol: 'C',
    description: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    position: 7,
    name: 'Nitrogen',
    weight: 14.0067,
    symbol: 'N',
    description: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    position: 8,
    name: 'Oxygen',
    weight: 15.9994,
    symbol: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    position: 9,
    name: 'Fluorine',
    weight: 18.9984,
    symbol: 'F',
    description: `Fluorine is a chemical element with symbol F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    position: 10,
    name: 'Neon',
    weight: 20.1797,
    symbol: 'Ne',
    description: `Neon is a chemical element with symbol Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];


@Component({
  selector: 'app-detalles-cliente',
  templateUrl: './detalles-cliente.component.html',
  styleUrls: ['./detalles-cliente.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DetallesClienteComponent implements OnInit, AfterViewInit {
  @ViewChild(MatAccordion) accordion: MatAccordion | any;
  columnasServicios: string[] = ['id', 'name_plan', 'direccion'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  columnasHistorial: string[] = ['history', 'modulo', 'nombre_user', 'created_at'];


  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = ['id_srv', 'name_plan', 'direccion'];
  expandedElement: PeriodicElement | any;


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
  numServicios: any;
  historial = new MatTableDataSource<any>();
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
    this._clientes.traerDatosCliente(this.idcliente).subscribe(
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
          if(this.datosClientes['social'] == 1){
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
    console.log('ngaferviweninit por aqui');
    this.historial.paginator = this.paginator;
  }

  obtenerServiciosClientes(){
    this.loading = true;
    this._clientes.obtenerServiciosClientes(this.idcliente).subscribe(
      (res: any) =>{
        console.log(res);
        this.numServicios = res['servicios'].length;
        this.servicios = new MatTableDataSource<any>(res['servicios']);
        this.historial = new MatTableDataSource<any>(res['history']);

        this.dataSource = new MatTableDataSource<any>(res['servicios']);

        this.historial.paginator = this.paginator;
        this.ngAfterViewInit();
        //facturacion para pagos y facturas
        this.facturacion = res['facturacion'];
        this.balance_in = res['balance_in'];
        this.balance = res['balance'];
        this.exoneraciones = res['exoneraciones'];
        this.exoneraciones_in = res['exoneraciones_in'];

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
    
    
  }

}
