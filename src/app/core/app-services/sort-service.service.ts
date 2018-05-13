import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ColumnSortCriteria } from '../app-helper/helper-model/column-sort-criteria';

@Injectable()
export class SortService {
  public onColumnSorted = new Subject<ColumnSortCriteria>();

  public columnSorted(event: ColumnSortCriteria): void {
    this.onColumnSorted.next(event);
  }
}
