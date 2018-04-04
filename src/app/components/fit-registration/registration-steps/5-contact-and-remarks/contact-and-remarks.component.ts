import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { DisplayedValue } from '../../../../core/app-helper/helper-model/displayed-value';
import { FormHelper } from '../../../../core/app-helper/form-helper';

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

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.stepFormGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string): boolean {
    return FormHelper.hasError(formName, this.stepFormGroup) != null &&
      FormHelper.isTouched(formName, this.stepFormGroup);
  }
}
