import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Graduate } from '../../../../core/model/graduate';
import { FormHelper } from '../../../../core/app-helper/form-helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisplayedValue } from '../../../../core/app-helper/helper-model/displayed-value';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { ToastrService } from 'ngx-toastr';
import { Address } from '../../../../core/model/address';
import { GraduateDAO } from '../../../../core/dao/graduate.dao';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { Company } from '../../../../core/model/company';
import { DataUpdateNotifier } from '../../../../core/app-services/data-update-notifier';

@Component({
  selector: 'fit-graduate-overview',
  templateUrl: './graduate-overview.component.html',
  styleUrls: ['./graduate-overview.component.scss']
})
export class GraduateOverviewComponent implements OnInit {

  @Input()
  public graduate: Graduate;

  @Output()
  public graduateChange: EventEmitter<Graduate> = new EventEmitter();

  @Output()
  public editModeChanged: EventEmitter<boolean> = new EventEmitter();

  public graduateFormGroup: FormGroup;
  public isEditing: boolean = false;

  public genders: DisplayedValue[];

  public constructor(private fb: FormBuilder,
                     private accountManagementService: AccountManagementService,
                     private appConfig: AppConfig,
                     private dataUpdateNotifier: DataUpdateNotifier,
                     private graduateDAO: GraduateDAO,
                     private toastr: ToastrService) {
    this.graduateFormGroup = this.fb.group({
      gender: [{value: 'M', disabled: !this.isEditing}],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
      addressAdditions: [''],
    });

    this.genders = this.appConfig.genders;
  }

  public ngOnInit(): void {
    this.fillFormWithGraduate();
  }

  public enableEditing(): void {
    this.setEditMode(true);
    this.graduateFormGroup.controls['gender'].enable();
  }

  public cancel(): void {
    this.setEditMode(false);
    this.fillFormWithGraduate();
    this.graduateFormGroup.controls['gender'].disable();
  }

  public async updateGraduate(): Promise<void> {
    if (this.graduateFormGroup.valid) {
      this.setEditMode(false);

      if (this.graduateFormGroup.touched) {
        this.updateGraduateFromForm();
        this.graduate = await this.graduateDAO.updateGraduate(this.graduate);
        this.graduateChange.emit(this.graduate);
        this.dataUpdateNotifier.updateGraduate(this.graduate);
        this.accountManagementService.updateGraduate(this.graduate);
        this.toastr.success('Die Änderungen wurden erfolgreich gespeichert.', 'Daten gespeichert!');
      }

      this.graduateFormGroup.controls['gender'].disable();
      this.graduateFormGroup.markAsUntouched();
    } else {
      this.toastr.error('Bitte überprüfen Sie Ihre Angaben auf Fehler.', 'Falsche Eingabe!');
    }
  }

  public isNoMail(formName: string): boolean {
    return FormHelper.isNoEmail(formName, this.graduateFormGroup) && this.isInvalid(formName);
  }

  public isEmpty(formName: string): boolean {
    return FormHelper.isEmpty(formName, this.graduateFormGroup) && this.isInvalid(formName);
  }

  public isTooLong(formName: string): boolean {
    return FormHelper.isTooLong(formName, this.graduateFormGroup) && this.isInvalid(formName);
  }

  public isInvalid(formName: string): boolean {
    return FormHelper.hasError(formName, this.graduateFormGroup) != null &&
      FormHelper.isTouched(formName, this.graduateFormGroup);
  }

  private fillFormWithGraduate() {
    this.graduateFormGroup.patchValue({
      gender: this.graduate.gender,
      firstName: this.graduate.firstName,
      lastName: this.graduate.lastName,
      email: this.graduate.email,
      phoneNumber: this.graduate.phoneNumber,
      street: this.graduate.address.street,
      streetNumber: this.graduate.address.streetNumber,
      zipCode: this.graduate.address.zipCode,
      city: this.graduate.address.city,
      addressAdditions: this.graduate.address.addition,
    });
  }

  private updateAddressFromForm(address: Address): Address {
    address.city = this.graduateFormGroup.value.city;
    address.zipCode = this.graduateFormGroup.value.zipCode;
    address.street = this.graduateFormGroup.value.street;
    address.streetNumber = this.graduateFormGroup.value.streetNumber;
    address.addition = this.graduateFormGroup.value.addressAdditions;
    return address;
  }

  private updateGraduateFromForm(): void {
    this.graduate.firstName = this.graduateFormGroup.value.firstName;
    this.graduate.lastName = this.graduateFormGroup.value.lastName;
    this.graduate.gender = this.graduateFormGroup.value.gender;
    this.graduate.email = this.graduateFormGroup.value.email;
    this.graduate.phoneNumber = this.graduateFormGroup.value.phoneNumber;
    this.graduate.address = this.updateAddressFromForm(this.graduate.address);
  }

  private setEditMode(mode: boolean): void {
    this.isEditing = mode;
    this.editModeChanged.emit(mode);
  }
}
