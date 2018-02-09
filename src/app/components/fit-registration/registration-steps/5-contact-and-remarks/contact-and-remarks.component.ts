import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { DisplayedValue } from '../../../../core/app-helper/helper-model/displayed-value';
import { FormValidationHelper } from '../../../../core/app-helper/form-validation-helper';

@Component({
  selector: 'fit-contact-and-remarks',
  templateUrl: './contact-and-remarks.component.html',
  styleUrls: ['./contact-and-remarks.component.scss']
})
export class ContactAndRemarksComponent implements OnInit {

  @Input()
  public isVisible: boolean = false;

  @Input()
  public stepFormGroup: FormGroup;

  public genders: DisplayedValue[];

  public constructor(private appConfig: AppConfig) {
    this.genders = appConfig.genders;
  }

  public ngOnInit() {
  }

  public isEmpty(formControlName: string): boolean {
    return this.stepFormGroup.controls[formControlName].value == null;
  }

  public isRequired(formName: string): boolean {
    return FormValidationHelper.isRequired(formName, this.stepFormGroup);
  }

  public isInvalid(formName: string): boolean {
    return FormValidationHelper.hasError(formName, this.stepFormGroup) != null &&
      FormValidationHelper.isTouched(formName, this.stepFormGroup);
  }
}
