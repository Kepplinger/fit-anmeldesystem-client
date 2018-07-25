import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../../../core/model/company';
import { Booking } from '../../../../core/model/booking';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { Contact } from '../../../../core/model/contact';
import { FormHelper } from '../../../../core/app-helper/form-helper';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../../../../core/app-services/event.service';
import { CompanyDAO } from '../../../../core/dao/company.dao';
import { Router } from '@angular/router';
import { Address } from '../../../../core/model/address';
import { DisplayedValue } from '../../../../core/app-helper/helper-model/displayed-value';
import { Event } from '../../../../core/model/event';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { ModalWindowService } from '../../../../core/app-services/modal-window.service';

@Component({
  selector: 'fit-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent implements OnInit {

  @Input()
  public company: Company = null;

  @Input()
  public booking: Booking = null;

  @Input()
  public showAdminVersion: boolean = false;

  @Output()
  public editModeChanged: EventEmitter<boolean> = new EventEmitter();

  public event: Event = null;
  public companyFormGroup: FormGroup;
  public isEditing: boolean = false;

  public genders: DisplayedValue[];

  public constructor(private fb: FormBuilder,
                     private eventService: EventService,
                     private accountManagementService: AccountManagementService,
                     private router: Router,
                     private companyDAO: CompanyDAO,
                     private toastr: ToastrService,
                     private appConfig: AppConfig) {
    this.companyFormGroup = this.fb.group({
      companyName: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      addressAdditions: [''],
      gender: [{value: 'M', disabled: !this.isEditing}],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhoneNumber: ['', Validators.required],
    });

    this.genders = this.appConfig.genders;
    this.event = this.eventService.currentEvent.getValue();

    this.eventService.currentEvent.subscribe((event: Event) => {
      this.event = event;
    });
  }

  public ngOnInit(): void {
    this.fillFormWithCompany();
  }

  public enableEditing(): void {
    this.setEditMode(true);
    this.companyFormGroup.controls['gender'].enable();
  }

  public async updateCompany(): Promise<void> {
    if (this.companyFormGroup.valid) {
      this.setEditMode(false);

      if (this.companyFormGroup.touched) {
        this.updateCompanyFromForm();
        this.company = await this.companyDAO.updateCompany(this.company);
        this.accountManagementService.updateCompany(this.company);
      }

      this.companyFormGroup.controls['gender'].disable();
      this.companyFormGroup.markAsUntouched();
    } else {
      FormHelper.touchAllFormFields(this.companyFormGroup);
      this.toastr.error('Bitte überprüfen Sie Ihre Angaben auf Fehler.', 'Falsche Eingabe!');
    }
  }

  public cancel(): void {
    this.setEditMode(false);
    this.fillFormWithCompany();
    this.companyFormGroup.controls['gender'].disable();
  }

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.companyFormGroup) && this.isInvalid(formName);
  }

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.companyFormGroup) && this.isInvalid(formName);
  }

  public isTooLong(formName: string): boolean {
    return FormHelper.isTooLong(formName, this.companyFormGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string): boolean {
    return FormHelper.hasError(formName, this.companyFormGroup) != null &&
      FormHelper.isTouched(formName, this.companyFormGroup);
  }

  private fillFormWithCompany() {
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
    contact.phoneNumber = this.companyFormGroup.value.contactPhoneNumber;
    return contact;
  }

  private setEditMode(mode: boolean): void {
    this.isEditing = mode;
    this.editModeChanged.emit(mode);
  }
}
