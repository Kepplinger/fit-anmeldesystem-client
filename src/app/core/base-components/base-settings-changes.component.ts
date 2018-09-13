import { EventEmitter, Output } from '@angular/core';

export class BaseSettingsChangesComponent {

  @Output()
  public changeHappened: EventEmitter<boolean> = new EventEmitter();

  protected unsavedChangesExist: boolean = false;

  protected setUnsavedChanges(value: boolean): void {
    this.unsavedChangesExist = value;
    this.changeHappened.emit(value);
  }
}
