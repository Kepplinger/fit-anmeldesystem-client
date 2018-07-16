import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'fit-account-container-wrapper',
  templateUrl: './account-container-wrapper.component.html',
  styleUrls: ['./account-container-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountContainerWrapperComponent {

  @Input()
  public containerSize: number = 0;

}
