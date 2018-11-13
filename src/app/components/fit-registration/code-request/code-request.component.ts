import { Component, OnInit } from '@angular/core';
import { DisplayedValue } from '../../../core/app-helper/helper-model/displayed-value';
import { AppConfig } from '../../../core/app-config/app-config.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayUtils } from '../../../core/utils/array-utils';
import { Address } from '../../../core/model/address';
import { Contact } from '../../../core/model/contact';
import { Company } from '../../../core/model/company';
import { CompanyDAO } from '../../../core/dao/company.dao';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../../core/app-helper/form-helper';
import { DataUpdateNotifier } from '../../../core/app-services/data-update-notifier';
import { Branch } from '../../../core/model/branch';
import { BranchDAO } from '../../../core/dao/branch.dao';
import { FormArrayUtils } from '../../../core/utils/form-array-utils';
import { BaseFormValidationComponent } from '../../../core/base-components/base-form-validation.component';
import { CompanyBranch } from '../../../core/model/company-branch';
import { HttpErrorResponse } from '@angular/common/http';
import { FitHttpError } from '../../../core/app-helper/helper-model/fit-http-error';

@Component({
  selector: 'fit-code-request',
  templateUrl: './code-request.component.html',
  styleUrls: ['./code-request.component.scss']
})
export class CodeRequestComponent extends BaseFormValidationComponent implements OnInit {

  public genders: DisplayedValue[];
  public formGroup: FormGroup;
  public isLoading: boolean = false;

  public branches: Branch[] = [];
  public branchFormArray: FormArray = null;

  public constructor(private appConfig: AppConfig,
                     private company: CompanyDAO,
                     private router: Router,
                     private dataUpdateNotifier: DataUpdateNotifier,
                     private toastr: ToastrService,
                     private branchDAO: BranchDAO,
                     private formBuilder: FormBuilder) {
    super();
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
      branches: this.formBuilder.array([])
    });
  }

  public async ngOnInit(): Promise<void> {
    this.branches = await this.branchDAO.fetchBranches();
    this.branchFormArray = <FormArray>this.formGroup.get('branches');
  }

  public async persistCompany(): Promise<void> {

    if (this.formGroup.valid) {
      let company = this.getCompanyFromForm();

      this.isLoading = true;
      let response = await this.company.persistCompany(company);
      this.isLoading = false;

      if (!(response instanceof FitHttpError)) {
        company = response as Company;
        this.dataUpdateNotifier.addCompany(company);
        this.toastr.success('Antrag erfolgreich versendet.', 'Firmen Antrag erfolgreich!');
        this.router.navigate(['']);
      }
    } else {
      FormHelper.touchAllFormFields(this.formGroup);
      this.toastr.error('Ihre Eingaben sind fehlerhaft.', 'Firmen Antrag fehlgeschalgen!');
    }
  }

  public branchChanged(branch: Branch, event: any): void {
    FormArrayUtils.elementChanged(branch, this.branchFormArray, event);
  }

  public isBranchSelected(branch: Branch): boolean {
    return FormArrayUtils.indexOfWithId(this.branchFormArray, branch) !== -1;
  }

  private getCompanyFromForm(): Company {
    let companyBranches: CompanyBranch[] = this.formGroup.value.branches
      .map(b => new CompanyBranch(null, b.id));

    return new Company(
      this.getCompanyAddressFromForm(),
      this.getContactFromForm(),
      this.formGroup.value.companyName,
      companyBranches,
      0
    );
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
