import { OnInit, Input, HostListener, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SortService } from '../../../core/app-services/sort-service.service';

@Component({
  selector: 'fit-sortable-column',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent implements OnInit, OnDestroy {

  @Input()
  public sortColumnName: string;

  @Input()
  public sortDirection: string = '';

  private columnSortedSubscription: Subscription;

  public constructor(private sortService: SortService) {
  }

  @HostListener('click')
  public sort(): void {
    if (this.sortDirection === 'desc' || this.sortDirection === '') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }

    this.sortService.columnSorted({sortColumn: this.sortColumnName, sortDirection: this.sortDirection});
  }

  public ngOnInit(): void {
    this.columnSortedSubscription = this.sortService.onColumnSorted.subscribe(event => {
      if (this.sortColumnName !== event.sortColumn) {
        this.sortDirection = '';
      }
    });
  }

  public ngOnDestroy(): void {
    this.columnSortedSubscription.unsubscribe();
  }
}
