import { Component, OnInit } from '@angular/core';
import { Company } from '../../../core/model/company';
import { AccountManagementService } from '../../../core/app-services/account-managenment.service';
import { DisplayedValue } from '../../../core/app-helper/helper-model/displayed-value';
import { DisplayedValueMapper } from '../../../core/app-helper/helper-model/mapper/displayed-value-mapper';
import { AppConfig } from '../../../core/app-config/app-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../core/model/address';
import { Contact } from '../../../core/model/contact';
import { CompanyDAO } from '../../../core/dao/company.dao';

@Component({
  selector: 'fit-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {

  public company: Company;
  public companyFormGroup: FormGroup;
  public isEditing: boolean = false;

  public constructor(private accountManagementService: AccountManagementService,
                     private fb: FormBuilder,
                     private companyDAO: CompanyDAO,
                     private appConfig: AppConfig) {
    this.companyFormGroup = this.fb.group({
      companyName: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      addressAdditions: ['', Validators.required],
      gender: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactPhoneNumber: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.company = this.accountManagementService.getCompany();
    this.fillFormWithBooking();
  }

  // public getMappedGenderOfContact(): string {
  //   return DisplayedValueMapper.mapToDisplayValue(this.company.contact.gender, this.appConfig.genders).display;
  // }

  private fillFormWithBooking() {
    this.companyFormGroup.patchValue({
      companyName: this.company.name,
      street: this.company.address.street,
      streetNumber: this.company.address.streetNumber,
      zipCode: this.company.address.zipCode,
      city: this.company.address.city,
      addressAdditions: this.company.address.addition,
      gender: DisplayedValueMapper.mapToDisplayValue(this.company.contact.gender, this.appConfig.genders).display,
      firstName: this.company.contact.firstName,
      lastName: this.company.contact.lastName,
      contactEmail: this.company.contact.email,
      contactPhoneNumber: this.company.contact.phoneNumber,
    });
  }

  public enableEditing(): void {
    this.isEditing = true;
  }

  public updateCompany(): void {
    this.isEditing = false;
    this.updateCompanyFromForm();
    this.companyDAO.updateCompany(this.company);
  }

  public cancel(): void {
    console.log(this.company);
    this.isEditing = false;
    this.fillFormWithBooking();
  }

  private updateCompanyFromForm(): void {
    this.company.name = this.companyFormGroup.value.companyName;
    this.company.address = this.getCompanyAddressFromForm();
    this.company.contact = this.getContactFromForm();
  }

  private getCompanyAddressFromForm(): Address {
    return new Address(
      this.companyFormGroup.value.city,
      this.companyFormGroup.value.zipCode,
      this.companyFormGroup.value.street,
      this.companyFormGroup.value.streetNumber,
      this.companyFormGroup.value.addressAdditions,
    );
  }

  private getContactFromForm(): Contact {
    return new Contact(
      this.companyFormGroup.value.firstName,
      this.companyFormGroup.value.lastName,
      this.companyFormGroup.value.gender,
      this.companyFormGroup.value.contactEmail,
      this.companyFormGroup.value.contactPhoneNumber
    );
  }
}
