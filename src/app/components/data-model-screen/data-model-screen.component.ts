import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataModelScreenDataSource } from './data-model-screen-datasource';
import { dataModel } from 'src/app/models/dataModel.model';
import { HttpClient } from '@angular/common/http';
import { ApiDataModelService } from 'src/app/services/api-data-model.service';


@Component({
  selector: 'app-data-model-screen',
  templateUrl: './data-model-screen.component.html',
  styleUrls: ['./data-model-screen.component.css']
})
export class DataModelScreenComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<dataModel>;
  dataSource: DataModelScreenDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['fieldName', 'dataType'];

  constructor(
    private http : HttpClient,
    private apiService : ApiDataModelService
  ) {
    this.dataSource = new DataModelScreenDataSource(this.apiService,this.http);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
