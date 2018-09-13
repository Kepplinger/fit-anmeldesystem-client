import { HostListener } from '@angular/core';
import { CanComponentDeactivate } from '../guards/can-deactivate-guard.service';

export abstract class BaseOnDeactivateAlertComponent implements CanComponentDeactivate {

  protected unsavedChangesExist: boolean = false;

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification() {
    return !this.unsavedChangesExist;
  }

  public async canDeactivate(): Promise<boolean> {
    if (this.unsavedChangesExist) {
      return confirm('Webseite verlassen? Ihre Änderungen werden eventuell nicht gespeichert.');
    } else {
      return true;
    }
  }

  public doUnsavedChangesExist(): boolean {
    return this.unsavedChangesExist;
  }
}
