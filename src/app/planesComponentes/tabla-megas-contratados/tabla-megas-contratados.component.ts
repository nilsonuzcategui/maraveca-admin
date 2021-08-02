import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InterfazMegasContratados } from 'src/app/planes/planes.component';
import { EditarPlanComponent } from '../editar-plan/editar-plan.component';

@Component({
  selector: 'app-tabla-megas-contratados',
  templateUrl: './tabla-megas-contratados.component.html',
  styleUrls: ['./tabla-megas-contratados.component.css']
})
export class TablaMegasContratadosComponent implements OnInit {
  @Input() data: any;
  @Input() filtrado: any;
  dataSource = new MatTableDataSource<InterfazMegasContratados>();
  displayedColumns: string[] = [ 'name_plan', 'cost_plan', 'taza', 'updated_at'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  @Output() cambioDeTablaHijo = new EventEmitter();
  @Output() editandoPlan = new EventEmitter();

  textoFiltro = '';
  datos_tabla: any = 'p';
  
  constructor(
    private MatDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  public ngOnChanges(changes: SimpleChanges) {
    if (changes.data) {
      this.dataSource = new MatTableDataSource<InterfazMegasContratados>(changes.data.currentValue);
      this.ngAfterViewInit();
    }
    if (changes.filtrado) {
      this.textoFiltro = changes.filtrado.currentValue;
      this.dataSource.filter = this.textoFiltro.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  radioChange($event: MatRadioChange) {
    this.datos_tabla = $event.value;
    this.cambioDeTablaHijo.emit(this.datos_tabla);
  }

  clickedRows(row :any){
    console.log(row);
    let dialogRef = this.MatDialog.open(EditarPlanComponent,
      {
        width: '600px',
        data: row
      });

      dialogRef.afterClosed().subscribe(
        result => {
          if (result == 1) { //True si se edito el plan
            this.editandoPlan.emit('exito');
          }
        }
      );
  }

}
