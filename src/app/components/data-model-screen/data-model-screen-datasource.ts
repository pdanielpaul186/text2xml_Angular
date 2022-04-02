import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subscription } from 'rxjs';
import { dataModel } from 'src/app/models/dataModel.model';
import { ApiDataModelService } from 'src/app/services/api-data-model.service';
import { HttpClient } from '@angular/common/http';

// TODO: replace this with real data from your application
//const EXAMPLE_DATA: dataModel[]

/**
 * Data source for the DataModelScreen view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataModelScreenDataSource extends DataSource<dataModel> {
  
  // EXAMPLE_DATA: dataModel[] = this.apiService.getDataModel().subscribe((data : dataModel[])=>{
  //   return data;
  // })

  EXAMPLE_DATA : dataModel[] = this.getData();
 
  getData(): any {
  this.apiService.getDataModel().subscribe((data : dataModel[]) => {
      this.EXAMPLE_DATA = data
      console.log(this.EXAMPLE_DATA)
    })
  }

  data: dataModel[] = this.EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor(
    private apiService : ApiDataModelService,
    private http : HttpClient  
  ) {
    super();
  }

  
  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */

  

  connect(): Observable<dataModel[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: dataModel[]): dataModel[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: dataModel[]): dataModel[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'fieldName': return compare(a.fieldName, b.fieldName, isAsc);
        case 'dataType': return compare(+a.dataType, +b.dataType, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}