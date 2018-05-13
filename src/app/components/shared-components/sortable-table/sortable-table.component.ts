import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { SortService } from '../../../core/app-services/sort-service.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[fitSortableTable]'
})
export class SortableTableDirective implements OnInit, OnDestroy {

  @Output()
  public onListSorted = new EventEmitter();

  private columnSortedSubscription: Subscription;

  public constructor(private sortService: SortService) {
  }

  public ngOnInit(): void {
    this.columnSortedSubscription = this.sortService.onColumnSorted
      .subscribe(event => {
        this.onListSorted.emit(event);
      });
  }

  public ngOnDestroy(): void {
    this.columnSortedSubscription.unsubscribe();
  }
}
