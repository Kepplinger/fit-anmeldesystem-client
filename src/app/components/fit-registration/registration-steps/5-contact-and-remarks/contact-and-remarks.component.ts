import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { DisplayedValue } from '../../../../core/app-helper/helper-model/displayed-value';
import { BaseFormValidationComponent } from '../../../../core/base-components/base-form-validation.component';

@Component({
  selector: 'fit-contact-and-remarks',
  templateUrl: './contact-and-remarks.component.html',
  styleUrls: ['./contact-and-remarks.component.scss']
})
export class ContactAndRemarksComponent extends BaseFormValidationComponent {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public formGroup: FormGroup;

  @Output()
  public onInput: EventEmitter<void> = new EventEmitter<void>();

  public genders: DisplayedValue[];

  public constructor(private appConfig: AppConfig) {
    super();
    this.genders = appConfig.genders;
  }
}
