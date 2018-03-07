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

  public genders: DisplayedValue[];

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
      gender: [{value: 'M', disabled: !this.isEditing}],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactPhoneNumber: ['', Validators.required],
    });

    this.genders = this.appConfig.genders;
  }

  public ngOnInit(): void {
    this.company = this.accountManagementService.getCompany();
    this.fillFormWithBooking();
  }

  private fillFormWithBooking() {
    this.companyFormGroup.patchValue({
      companyName: this.company.name,
      street: this.company.address.street,
      streetNumber: this.company.address.streetNumber,
      zipCode: this.company.address.zipCode,
      city: this.company.address.city,
      addressAdditions: this.company.address.addition,
      gender: this.company.contact.gender,
      firstName: this.company.contact.firstName,
      lastName: this.company.contact.lastName,
      contactEmail: this.company.contact.email,
      contactPhoneNumber: this.company.contact.phoneNumber,
    });
  }

  public enableEditing(): void {
    this.isEditing = true;
    this.companyFormGroup.controls['gender'].enable();
  }

  public updateCompany(): void {
    this.isEditing = false;
    this.companyFormGroup.controls['gender'].disable();
    this.updateCompanyFromForm();
    this.companyDAO.updateCompany(this.company);
  }

  public cancel(): void {
    this.isEditing = false;
    this.companyFormGroup.controls['gender'].disable();
    this.fillFormWithBooking();
  }

  private updateCompanyFromForm(): void {
    this.company.name = this.companyFormGroup.value.companyName;
    this.company.address = this.updateCompanyAddressFromForm(this.company.address);
    this.company.contact = this.updateContactFromForm(this.company.contact);
  }

  private updateCompanyAddressFromForm(address: Address): Address {
    address.city = this.companyFormGroup.value.city;
    address.zipCode = this.companyFormGroup.value.zipCode;
    address.street = this.companyFormGroup.value.street;
    address.streetNumber = this.companyFormGroup.value.streetNumber;
    address.addition = this.companyFormGroup.value.addressAdditions;
    return address;
  }

  private updateContactFromForm(contact: Contact): Contact {
    contact.firstName = this.companyFormGroup.value.firstName;
    contact.lastName = this.companyFormGroup.value.lastName;
    contact.gender = this.companyFormGroup.value.gender;
    contact.email = this.companyFormGroup.value.contactEmail;
    contact.phoneNumber = this.companyFormGroup.value.contactPhoneNumbe;
    return contact;
  }
}
