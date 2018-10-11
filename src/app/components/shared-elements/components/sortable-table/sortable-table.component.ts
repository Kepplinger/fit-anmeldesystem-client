import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SortService } from '../../../../core/app-services/sort-service.service';
import { Subscription } from 'rxjs';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Directive({
  selector: '[fitSortableTable]'
})
export class SortableTableDirective extends BaseSubscriptionComponent implements OnInit {

  @Output()
  public onListSorted = new EventEmitter();

  public constructor(private sortService: SortService) {
    super();
  }

  public ngOnInit(): void {
    this.addSub(this.sortService.onColumnSorted.subscribe(event => {
      this.onListSorted.emit(event);
    }));
  }
}
