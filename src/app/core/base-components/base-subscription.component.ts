import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

export class BaseSubscriptionComponent implements OnDestroy {

  protected subscriptions: Subscription[] = [];

  public ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      if (s != null) {
        s.unsubscribe();
        s = null;
      }
    });
  }

  protected addSub(subscription: Subscription): void {
    this.subscriptions.push(subscription);
  }
}
