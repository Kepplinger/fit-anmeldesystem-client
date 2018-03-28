import { Component } from '@angular/core';
import { DisplayedValue } from '../../../core/app-helper/helper-model/displayed-value';
import { AppConfig } from '../../../core/app-config/app-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayUtils } from '../../../core/utils/array-utils';
import { Address } from '../../../core/model/address';
import { Contact } from '../../../core/model/contact';
import { Company } from '../../../core/model/company';
import { CompanyDAO } from '../../../core/dao/company.dao';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormValidationHelper } from '../../../core/app-helper/form-validation-helper';

@Component({
  selector: 'fit-code-request',
  templateUrl: './code-request.component.html',
  styleUrls: ['./code-request.component.scss']
})
export class CodeRequestComponent {

  public genders: DisplayedValue[];
  public formGroup: FormGroup;
  public isLoading: boolean = false;

  public constructor(private appConfig: AppConfig,
                     private company: CompanyDAO,
                     private router: Router,
                     private toastr: ToastrService,
                     private formBuilder: FormBuilder) {
    this.genders = appConfig.genders;

    this.formGroup = formBuilder.group({
      companyName: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      gender: [ArrayUtils.getFirstElement(this.appConfig.genders).value],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    })
  }

  public async persistCompany(): Promise<void> {

    if (this.formGroup.valid) {
      this.isLoading = true;
      await this.company.persistCompany(this.getCompanyFromForm());
      this.isLoading = false;
      this.toastr.success('Antrag erfolgreich versendet.', 'Firmen Antrag erfolgreich!');
      this.router.navigate(['']);
    } else {
      FormValidationHelper.validateAllFormFields(this.formGroup);
      this.toastr.error('Ihr Eingaben sind nicht noch fehlerhaft.', 'Firmen Antrag fehlgeschalgen!');
    }
  }

  public isNoMail(formName: string): boolean {
    return FormValidationHelper.isNoEmail(formName, this.formGroup) && this.isInvalid(formName);
  }

  public isEmpty(formName: string): boolean {
    return FormValidationHelper.isEmpty(formName, this.formGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string): boolean {
    return FormValidationHelper.hasError(formName, this.formGroup) != null &&
      FormValidationHelper.isTouched(formName, this.formGroup);
  }

  private getCompanyFromForm(): Company {
    return new Company(
      this.getCompanyAddressFromForm(),
      this.getContactFromForm(),
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
