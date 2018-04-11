import { ColumnSortCriteria } from './helper-model/column-sort-criteria';

export class SortHelper {

  /**
   * Recursive SortHandler which takes two objects and a SortCriteria, and returns the corresponding compare-number.
   */
  public static sortHandler(a: any, b: any, criteria: ColumnSortCriteria): number {
    let sortColumns: any[] = criteria.sortColumn.split('.');
    let currentSortColumn = sortColumns[0];
    let sortDirection: string = criteria.sortDirection;

    if (a[currentSortColumn] == null || b[currentSortColumn] == null) {
      return this.handleUndefinedValues(a[currentSortColumn], b[currentSortColumn]);
    } else if (sortColumns.length > 1) {
      sortColumns.splice(0, 1);

      // clone for bugfix
      criteria = {
        sortColumn: sortColumns.join('.'),
        sortDirection: sortDirection
      };

      return this.sortHandler(a[currentSortColumn], b[currentSortColumn], criteria);
    } else {
      if (sortDirection === 'desc') {
        return this.compareValues(a[currentSortColumn], b[currentSortColumn])
      } else {
        return this.compareValues(b[currentSortColumn], a[currentSortColumn]);
      }
    }
  }

  private static compareValues(a: any, b: any): number {
    if (a < b) {
      return 1;
    }
    if (a === b) {
      return 0;
    }
    if (a > b) {
      return -1;
    }
  }

  private static handleUndefinedValues(a: any, b: any): number {
    if (a == null && b != null) {
      return 1;
    }
    if (a == null && b == null) {
      return 0;
    }
    if (a != null && b == null) {
      return -1;
    }
  }
}
