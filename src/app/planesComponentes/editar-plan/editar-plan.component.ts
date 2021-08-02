import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanesService } from 'src/app/_servicios/planes.service';

@Component({
  selector: 'app-editar-plan',
  templateUrl: './editar-plan.component.html',
  styleUrls: ['./editar-plan.component.css']
})
export class EditarPlanComponent implements OnInit {

  registerForm = this.formBuilder.group({});
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos:any,
    private formBuilder: FormBuilder,
    private _planes: PlanesService,
    private _snackBar: MatSnackBar,
    private MatDialogRef: MatDialogRef<EditarPlanComponent>,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name_plan: [this.datos['name_plan'], Validators.required],
      taza: [this.datos['taza'], Validators.required],
      cost_plan: this.datos['cost_plan'],
      tipo_plan: [this.datos['tipo_plan'], Validators.required],
      id_plan: this.datos['id_plan'],
      carac_plan: this.datos['carac_plan'],
      dmb_plan: this.datos['dmb_plan'],
      umb_plan: this.datos['umb_plan'],
      descripcion: this.datos['descripcion']
    });
  }

  cerrarDialogo(){
    this.MatDialogRef.close(false);
  }

  submitAgregar(){
    this.loading = true;
    let datos = this.registerForm.value;
    this._planes.editarPlan(this.datos['id_plan'], datos).subscribe(
      (res:any) => {
        this.MatDialogRef.close(res);
        this._snackBar.open('Exito al editar el plan', 'ok',{duration: 3000});
      }, (err: any) => {
        console.log(err);
        this._snackBar.open('Error al editar el plan', 'ok',{duration: 3000});
      }, () => {
        this.loading = false;
      }
    );
  }

}
