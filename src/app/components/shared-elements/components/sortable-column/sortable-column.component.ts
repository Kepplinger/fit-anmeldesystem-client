import { OnInit, Input, HostListener, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SortService } from '../../../../core/app-services/sort-service.service';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-sortable-column',
  templateUrl: './sortable-column.component.html',
  styleUrls: ['./sortable-column.component.scss']
})
export class SortableColumnComponent extends BaseSubscriptionComponent implements OnInit, OnDestroy {

  @Input()
  public sortColumnName: string;

  @Input()
  public sortDirection: string = '';

  public constructor(private sortService: SortService) {
    super();
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
    this.addSub(this.sortService.onColumnSorted.subscribe(event => {
      if (this.sortColumnName !== event.sortColumn) {
        this.sortDirection = '';
      }
    }));
  }
}
