import { Subscription } from 'rxjs';

export class SubscriptionUtils {
  public static unsubscribe(subscription: Subscription): void {
    if (subscription != null && !subscription.closed) {
      subscription.unsubscribe();
      subscription = null;
    }
  }

  public static unsubscribeMultiple(subscriptions: Subscription[]): void {
    subscriptions.forEach(s => this.unsubscribe(s));
  }
}
