import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanesService } from 'src/app/_servicios/planes.service';

@Component({
  selector: 'app-agregar-plan',
  templateUrl: './agregar-plan.component.html',
  styleUrls: ['./agregar-plan.component.css']
})
export class AgregarPlanComponent implements OnInit {

  registerForm = this.formBuilder.group({});

  //dinamismo formulario
  inputCosto: boolean = true;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public iduser:any,
    private formBuilder: FormBuilder,
    private _planes: PlanesService,
    private _snackBar: MatSnackBar,
    private MatDialogRef: MatDialogRef<AgregarPlanComponent>,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name_plan: ['', Validators.required],
      taza: [0, Validators.required],
      cost_plan: [0],
      tipo_plan: ['1', Validators.required],
      id_plan: '',
      carac_plan: ['1'],
      dmb_plan: [0],
      umb_plan: [0],
      descripcion: ''
    });
  }

  cambiandoTipoServicio(e: any){
    let tipoServicio = e['value'];
    if (tipoServicio == 3) {
      this.inputCosto = false;
    }else{
      this.inputCosto = true;
    }
  }

  submitAgregar(){
    this.loading = true;
    let datos = this.registerForm.value;
    this._planes.agregarPlan(datos).subscribe(
      (res: any) => {
        console.log(res);
        if (res['id']) {
          this._snackBar.open('Plan agregado con exito', 'ok',{duration: 3000});
          this.MatDialogRef.close(true);
        }else{
          this._snackBar.open('Lo siento, no se pudo agregar el plan', 'ok',{duration: 3000});
        }
      },(err: any) => {
        console.log(err);
        this._snackBar.open('Error al añadir el plan', 'ok',{duration: 3000});
      }, () => {
        this.loading = false;
      }
    );
  }

  cerrarDialogo(){
    this.MatDialogRef.close(false);
  }

}
