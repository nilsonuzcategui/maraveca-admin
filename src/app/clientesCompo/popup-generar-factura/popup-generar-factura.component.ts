import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-popup-generar-factura',
  templateUrl: './popup-generar-factura.component.html',
  styleUrls: ['./popup-generar-factura.component.css']
})
export class PopupGenerarFacturaComponent implements OnInit {

  groupForm = this.formBuilder.group({});
  //Variables para dinamismo
  loadingForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private MatDialogRef: MatDialogRef<PopupGenerarFacturaComponent>,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.MatDialogRef.close();
  }

}
