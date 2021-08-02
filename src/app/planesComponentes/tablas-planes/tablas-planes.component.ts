import { Component, Input, OnInit, Output, SimpleChanges, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TablaPlanes } from 'src/app/planes/planes.component';
import { EditarPlanComponent } from '../editar-plan/editar-plan.component';

@Component({
  selector: 'app-tablas-planes',
  templateUrl: './tablas-planes.component.html',
  styleUrls: ['./tablas-planes.component.css']
})
export class TablasPlanesComponent implements OnInit {
  @Input() data: any;
  @Input() filtrado: any;
  dataSource = new MatTableDataSource<TablaPlanes>();
  displayedColumns: string[] = [ 'name_plan', 'cost_plan', 'taza', 'updated_at', 'acciones'];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  @Output() editandoPlan = new EventEmitter();

  textoFiltro = '';


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
      this.dataSource = new MatTableDataSource<TablaPlanes>(changes.data.currentValue);
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
