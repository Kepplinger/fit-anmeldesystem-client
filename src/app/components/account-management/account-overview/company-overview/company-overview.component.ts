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
import { DataUpdateNotifier } from '../../../../core/app-services/data-update-notifier';
import { Branch } from '../../../../core/model/branch';
import { BranchDAO } from '../../../../core/dao/branch.dao';
import { CompanyBranch } from '../../../../core/model/company-branch';
import { BaseFormValidationComponent } from '../../../../core/base-components/base-form-validation.component';
import { BaseSubscriptionComponent } from '../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-company-overview',
  templateUrl: './company-overview.component.html',
  styleUrls: ['./company-overview.component.scss']
})
export class CompanyOverviewComponent extends BaseFormValidationComponent implements OnInit {

  @Input()
  public company: Company = null;

  @Output()
  public companyChange: EventEmitter<Company> = new EventEmitter();

  @Input()
  public booking: Booking = null;

  @Input()
  public isAdminVersion: boolean = false;

  @Output()
  public editModeChanged: EventEmitter<boolean> = new EventEmitter();

  public event: Event = null;
  public formGroup: FormGroup;
  public isEditing: boolean = false;

  public genders: DisplayedValue[];
  public branches: Branch[] = [];
  public selectedBranches: any[] = [];

  public constructor(private fb: FormBuilder,
                     private eventService: EventService,
                     private accountManagementService: AccountManagementService,
                     private router: Router,
                     private branchDAO: BranchDAO,
                     private dataUpdateNotifier: DataUpdateNotifier,
                     private companyDAO: CompanyDAO,
                     private toastr: ToastrService,
                     private appConfig: AppConfig) {
    super();
    this.formGroup = this.fb.group({
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

    this.addSub(this.eventService.currentEvent.subscribe((event: Event) => {
      this.event = event;
    }));
  }

  public async ngOnInit(): Promise<void> {
    this.fillFormWithCompany();
  }

  public enableEditing(): void {
    this.setEditMode(true);
    this.formGroup.controls['gender'].enable();
  }

  public async updateCompany(): Promise<void> {
    if (this.formGroup.valid) {
      this.setEditMode(false);

      if (this.formGroup.touched) {
        this.updateCompanyFromForm();
        this.company = await this.companyDAO.updateCompany(this.company);
        this.companyChange.emit(this.company);
        this.dataUpdateNotifier.updateCompany(this.company);
        if (!this.isAdminVersion) {
          this.accountManagementService.updateCompany(this.company);
        }
        this.toastr.success('Die Änderungen wurden erfolgreich gespeichert.', 'Daten gespeichert!');
      }

      this.formGroup.controls['gender'].disable();
      this.formGroup.markAsUntouched();
    } else {
      FormHelper.touchAllFormFields(this.formGroup);
      this.toastr.error('Bitte überprüfen Sie Ihre Angaben auf Fehler.', 'Falsche Eingabe!');
    }
  }

  public cancel(): void {
    this.setEditMode(false);
    this.fillFormWithCompany();
    this.formGroup.controls['gender'].disable();
  }

  public companyChanged(): void {
    this.formGroup.markAsTouched();
  }

  private async fillFormWithCompany(): Promise<void> {
    this.formGroup.patchValue({
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

    this.selectedBranches = (await this.branchDAO.fetchBranches())
      .map(b => {
        return {branch: b, selected: this.isBranchSelected(b)};
      });
  }

  private updateCompanyFromForm(): void {
    this.company.branches = this.selectedBranches.filter(b => b.selected)
      .map(b => new CompanyBranch(this.company.id, b.branch.id));

    this.company.name = this.formGroup.value.companyName;
    this.company.address = this.updateCompanyAddressFromForm(this.company.address);
    this.company.contact = this.updateContactFromForm(this.company.contact);
  }

  private updateCompanyAddressFromForm(address: Address): Address {
    address.city = this.formGroup.value.city;
    address.zipCode = this.formGroup.value.zipCode;
    address.street = this.formGroup.value.street;
    address.streetNumber = this.formGroup.value.streetNumber;
    address.addition = this.formGroup.value.addressAdditions;
    return address;
  }

  private updateContactFromForm(contact: Contact): Contact {
    contact.firstName = this.formGroup.value.firstName;
    contact.lastName = this.formGroup.value.lastName;
    contact.gender = this.formGroup.value.gender;
    contact.email = this.formGroup.value.contactEmail;
    contact.phoneNumber = this.formGroup.value.contactPhoneNumber;
    return contact;
  }

  private setEditMode(mode: boolean): void {
    this.isEditing = mode;
    this.editModeChanged.emit(mode);
  }

  private isBranchSelected(branch: Branch): boolean {
    if (this.company != null && this.company.branches != null && branch != null) {
      return this.company.branches.find(b => b.branch.id === branch.id) != null;
    } else {
      return false;
    }
  }
}
