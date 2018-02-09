import { Component } from '@angular/core';
import { DisplayedValue } from '../../../core/app-helper/helper-model/displayed-value';
import { AppConfig } from '../../../core/app-config/app-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayUtils } from '../../../core/utils/array-utils';
import { Address } from '../../../core/model/address';
import { Contact } from '../../../core/model/contact';
import { Company } from '../../../core/model/company';
import { CompanyDAO } from '../../../core/dao/company.dao';

@Component({
  selector: 'fit-code-request',
  templateUrl: './code-request.component.html',
  styleUrls: ['./code-request.component.scss']
})
export class CodeRequestComponent {

  public genders: DisplayedValue[];
  public formGroup: FormGroup;

  public constructor(private appConfig: AppConfig,
                     private company: CompanyDAO,
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

  public persistCompany(): void {
    this.company.persistCompany(this.getCompanyFromForm());
  }

  private getCompanyFromForm(): Company {
    return new Company(
      this.getCompanyAddressFromForm(),
      this.getContactFromForm(),
      null,
      this.formGroup.value.companyName,
      true
    )
  }

  private getCompanyAddressFromForm(): Address {
    return new Address(
      this.formGroup.value.city,
      this.formGroup.value.zipCode,
      this.formGroup.value.street,
      this.formGroup.value.streetNumber,
      this.formGroup.value.addressAdditions,
    );
  }

  private getContactFromForm(): Contact {
    return new Contact(
      this.formGroup.value.firstName,
      this.formGroup.value.lastName,
      this.formGroup.value.gender,
      this.formGroup.value.email,
      this.formGroup.value.phoneNumber
    );
  }

}
