import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'fit-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss']
})
export class CustomCheckboxComponent {

  @Input()
  public preventMargins: boolean = false;

  @Input()
  public readonly: boolean = false;

  @Input()
  public message: string;

  @Input()
  public value: boolean;

  @Output()
  public valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public onChange(): void {
    this.valueChange.emit(this.value);
  }

}
