import { EventEmitter, Output } from '@angular/core';
import { BaseSubscriptionComponent } from './base-subscription.component';

export class BaseSettingsChangesComponent extends BaseSubscriptionComponent{

  @Output()
  public changeHappened: EventEmitter<boolean> = new EventEmitter();

  public unsavedChangesExist: boolean = false;

  protected setUnsavedChanges(value: boolean): void {
    this.unsavedChangesExist = value;
    this.changeHappened.emit(value);
  }
}
