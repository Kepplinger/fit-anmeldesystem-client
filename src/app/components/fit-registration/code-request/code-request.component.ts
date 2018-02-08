import { Component, OnInit } from '@angular/core';
import { DisplayedValue } from '../../../core/app-helper/helper-model/displayed-value';
import { AppConfig } from '../../../core/app-config/app-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayUtils } from '../../../core/utils/array-utils';

@Component({
  selector: 'fit-code-request',
  templateUrl: './code-request.component.html',
  styleUrls: ['./code-request.component.scss']
})
export class CodeRequestComponent {

  public genders: DisplayedValue[];
  public formGroup: FormGroup;

  public constructor(private appConfig: AppConfig,
                     private formBuilder: FormBuilder) {
    this.genders = appConfig.genders;

    this.formGroup = formBuilder.group({
      companyName: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      gender: [ArrayUtils.getFirstElement(this.appConfig.genders).value],
      firstName: [''],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
    })
  }

}
