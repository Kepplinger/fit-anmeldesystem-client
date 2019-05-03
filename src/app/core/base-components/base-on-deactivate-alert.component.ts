import { HostListener } from '@angular/core';
import { CanComponentDeactivate } from '../guards/can-deactivate.guard';
import { BaseSubscriptionComponent } from './base-subscription.component';
import { ReauthService } from '../../components/admin-tool/services/reauth.service';

export abstract class BaseOnDeactivateAlertComponent extends BaseSubscriptionComponent implements CanComponentDeactivate {

  protected unsavedChangesExist: boolean = false;

  protected constructor(protected reauthService: ReauthService) {
    super();
  }

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification() {
    return !this.unsavedChangesExist;
  }

  public async canDeactivate(): Promise<boolean> {
    if (this.unsavedChangesExist && !this.reauthService.isReauthNecessary) {
      return confirm('Webseite verlassen? Ihre Änderungen werden eventuell nicht gespeichert.');
    } else {
      return true;
    }
  }

  public doUnsavedChangesExist(): boolean {
    return this.unsavedChangesExist;
  }
}
