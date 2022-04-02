import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface TemplatesItem {
  templateName: string;
  templateID : number;
  // templateID: string;
  // abbrev: string;
  // fields : number;
  // description : string;
  // toC : string;
  // fileUsed : string;
}

const EXAMPLE_DATA: TemplatesItem[] = [
  {templateID: 1, templateName: 'Hydrogen'},
  {templateID: 2, templateName: 'Helium'},
  {templateID: 3, templateName: 'Lithium'},
  {templateID: 4, templateName: 'Beryllium'},
  {templateID: 5, templateName: 'Boron'},
  {templateID: 6, templateName: 'Carbon'},
  {templateID: 7, templateName: 'Nitrogen'},
  {templateID: 8, templateName: 'Oxygen'},
  {templateID: 9, templateName: 'Fluorine'},
  {templateID: 10, templateName: 'Neon'},
  {templateID: 11, templateName: 'Sodium'},
  {templateID: 12, templateName: 'Magnesium'},
  {templateID: 13, templateName: 'Aluminum'},
  {templateID: 14, templateName: 'Silicon'},
  {templateID: 15, templateName: 'Phosphorus'},
  {templateID: 16, templateName: 'Sulfur'},
  {templateID: 17, templateName: 'Chlorine'},
  {templateID: 18, templateName: 'Argon'},
  {templateID: 19, templateName: 'Potassium'},
  {templateID: 20, templateName: 'Calcium'},
];

/**
 * Data source for the Templates view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TemplatesDataSource extends DataSource<TemplatesItem> {
  data: TemplatesItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TemplatesItem[]> {
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
  private getPagedData(data: TemplatesItem[]): TemplatesItem[] {
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
  private getSortedData(data: TemplatesItem[]): TemplatesItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'templateName': return compare(a.templateName, b.templateName, isAsc);
        case 'templateID': return compare(+a.templateID, +b.templateID, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}