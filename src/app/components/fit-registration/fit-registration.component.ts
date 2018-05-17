import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FitRegistrationStep, getOrderedFitRegistrationSteps } from '../../core/model/enums/fit-registration-step';
import { BookingDAO } from '../../core/dao/booking.dao';
import { Booking } from '../../core/model/booking';
import { Contact } from '../../core/model/contact';
import { Presentation } from '../../core/model/presentation';
import { Event } from '../../core/model/event';
import { Package } from '../../core/model/package';
import { FitPackage } from '../../core/model/enums/fit-package';
import { AppConfig } from '../../core/app-config/app-config.service';
import { EventDAO } from '../../core/dao/event.dao';
import { ModalWindowService } from '../../core/app-services/modal-window.service';
import { EventService } from '../../core/app-services/event.service';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../core/app-helper/form-helper';
import { AccountManagementService } from '../../core/app-services/account-managenment.service';
import { fitCompanyDescriptionValidator } from '../../core/form-validators/fit-company-description';
import { DataFile } from '../../core/model/data-file';
import { ModalTemplateCreatorHelper } from '../../core/app-helper/modal-template-creator-helper';
import { Representative } from '../../core/model/representative';
import { RepresentativeMapper } from '../../core/model/mapper/representative-mapper';

interface FitStep {
  step: FitRegistrationStep;
  isValid: boolean;
  wasValidated: boolean;
  isVisited: boolean;
}

@Component({
  selector: 'fit-fit-registration',
  templateUrl: './fit-registration.component.html',
  styleUrls: ['./fit-registration.component.scss']
})
export class FitRegistrationComponent implements OnInit {

  // necessary for template-usage
  public Step = FitRegistrationStep;

  public currentStep: FitRegistrationStep;
  public fitFormGroup: FormGroup;
  public event: Event;

  public steps: FitStep[];

  public isFormTouched: boolean = false;
  public isEditMode: boolean;

  private booking: Booking = new Booking();

  public constructor(private router: Router,
                     private bookingDAO: BookingDAO,
                     private eventDAO: EventDAO,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private toastr: ToastrService,
                     private accountManagementService: AccountManagementService,
                     private modalWindowService: ModalWindowService,
                     private fb: FormBuilder) {

    // creates a FitStep Array out of the ordered steps
    this.steps = getOrderedFitRegistrationSteps().map(s => {
      return {
        step: s,
        isValid: true,
        wasValidated: false,
        isVisited: false
      } as FitStep;
    });

    // visits first step and validates it as true
    this.currentStep = FitRegistrationStep.GeneralData;
    this.steps.find(s => s.step === this.currentStep).isVisited = true;
    this.steps.find(s => s.step === this.currentStep).wasValidated = true;

    this.booking = this.accountManagementService.booking;
    this.isEditMode = this.accountManagementService.currentBookingExists;

    this.fitFormGroup = fb.group({
      generalData: fb.group({
        companyName: [this.booking.company.name, Validators.required],
        street: [this.booking.company.address.street, Validators.required],
        streetNumber: [this.booking.company.address.streetNumber, Validators.required],
        zipCode: [this.booking.company.address.zipCode, Validators.required],
        city: [this.booking.company.address.city, Validators.required],
        addressAdditions: [this.booking.company.address.addition],
        gender: [{value: this.booking.company.contact.gender, disabled: true}],
        firstName: [this.booking.company.contact.firstName, Validators.required],
        lastName: [this.booking.company.contact.lastName, Validators.required],
        contactEmail: [this.booking.company.contact.email, Validators.required],
        contactPhoneNumber: [this.booking.company.contact.phoneNumber, Validators.required],
      }),
      detailedData: fb.group({
        branch: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        homepage: ['', Validators.required],
        logo: [new DataFile()],
        description: ['', fitCompanyDescriptionValidator(15, 65)],
        establishmentsAut: this.fb.array([]),
        establishmentsCountAut: [0, Validators.required],
        establishmentsInt: this.fb.array([]),
        establishmentsCountInt: [0],
        desiredBranches: this.fb.array([]),
        providesSummerJob: [false],
        providesThesis: [false]
      }),
      fitAppearance: fb.group({
        representatives: this.fb.array([]),
        additionalInfo: [''],
        resources: this.fb.array([])
      }),
      packagesAndLocation: fb.group({
        fitPackage: [null, Validators.required],
        location: [null],
        presentationTitle: [''],
        presentationDescription: [''],
        presentationBranches: this.fb.array([]),
        presentationFile: [new DataFile()]
      }),
      contactAndRemarks: fb.group({
        fitContactGender: [this.booking.company.contact.gender],
        fitContactFirstName: [this.booking.company.contact.firstName, Validators.required],
        fitContactLastName: [this.booking.company.contact.lastName, Validators.required],
        fitContactEmail: [this.booking.company.contact.email, [Validators.required, Validators.email]],
        fitContactPhoneNumber: [this.booking.company.contact.phoneNumber, Validators.required],
        remarks: [''],
        termsAccepted: [false, Validators.requiredTrue]
      })
    });
  }

  public async ngOnInit(): Promise<void> {
    this.event = this.eventService.currentEvent.getValue();
    let useOldBooking: boolean = false;

    if (this.booking.id != null && !this.isEditMode) {
      useOldBooking = await this.modalWindowService.confirm(
        'Anmeldung von letzten Mal übernehemen?',
        'Wollen Sie die Daten von Ihrer letzten Anmeldung beim FIT als Vorlage nehmen?',
        {
          closableByDimmer: false,
          movable: false,
          labels: {ok: 'Verwenden', cancel: 'Nicht verwenden'}
        }
      );
    }

    if (this.isEditMode || useOldBooking) {
      this.fillFormWithBooking();
    }
  }

  public async setCurrentPage(oldStep: FitRegistrationStep, newStep: FitRegistrationStep): Promise<void> {

    let oldStepFormGroup = this.getFormGroupForStep(oldStep);
    let oldStepObject: FitStep = this.steps.find(s => s.step === oldStep);
    let newStepObject: FitStep = this.steps.find(s => s.step === newStep);

    FormHelper.touchAllFormFields(oldStepFormGroup);
    oldStepObject.isValid = oldStepFormGroup.valid;
    oldStepObject.wasValidated = true;

    let switchToNextStep: boolean = true;

    if (!oldStepObject.isValid) {
      switchToNextStep = await this.modalWindowService.confirm(
        `<h2 class="text-bold text-dark">Vorsicht!</h2>`,
        ModalTemplateCreatorHelper.getNextStepWarning(),
        ModalTemplateCreatorHelper.getBasicModalOptions('Trotzdem fortfahren', 'Abbrechen')
      );
    }

    if (switchToNextStep) {
      if (this.getFormGroupForStep(newStep).valid) {
        newStepObject.isValid = true;
        newStepObject.wasValidated = true;
      }
      newStepObject.isVisited = true;

      this.currentStep = newStep;
      window.scrollTo(0, 0);
    }
  }

  public validateStep(step: FitRegistrationStep): void {
    let stepObject: FitStep = this.steps.find(s => s.step === step);

    if (this.getFormGroupForStep(step).valid) {
      stepObject.isValid = true;
      stepObject.wasValidated = true;
    } else {
      stepObject.isValid = false;
    }
  }

  public nextPage() {
    this.setCurrentPage(this.currentStep, this.currentStep + 1);
  }

  public previousPage() {
    this.setCurrentPage(this.currentStep, this.currentStep - 1);
  }

  public isCurrentStep(step: FitRegistrationStep): boolean {
    return step === this.currentStep;
  }

  public isValid(step: FitStep): boolean {
    return step.isValid && step.wasValidated;
  }

  public isInvalid(step: FitStep): boolean {
    return !step.isValid && step.wasValidated;
  }

  public getProgress(): number {

    const progressFactor: number = 15;
    let progress: number = 0;

    progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('detailedData'));
    progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('fitAppearance'));
    progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('packagesAndLocation'));

    if (this.steps.find(s => s.step === FitRegistrationStep.ContactAndRemarks).isVisited) {
      progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('contactAndRemarks'));
    } else {
      progress += 5;
    }

    progress += 5 - this.steps.filter(s => s.isVisited && s.wasValidated).length;

    return (progressFactor - progress) / progressFactor;
  }

  public async submitBooking(): Promise<void> {

    if (this.fitFormGroup.valid) {

      // if (true) {
      //   await this.modalWindowService.confirm('test test 123',
      //     ModalTemplateCreatorHelper.getRegistrationWarningModalContent(null));
      // }

      let booking: Booking = this.getBookingFromForm();
      await this.bookingDAO.persistBooking(booking);
      this.router.navigateByUrl('fit/anmeldung-erfolgreich');
    } else {
      this.toastr.error('Bitte überprüfen Sie Ihre Eingaben.', 'Anmeldung fehlgeschlagen!');
      this.isFormTouched = true;
      FormHelper.touchAllFormFields(this.fitFormGroup);

      for (let step of this.steps) {
        step.isValid = this.getFormGroupForStep(step.step).valid;
      }
    }
  }

  private getBookingFromForm(): Booking {
    return new Booking(
      this.event,
      this.fitFormGroup.value.packagesAndLocation.fitPackage,
      this.fitFormGroup.value.packagesAndLocation.location,
      this.getContactFromForm(),
      this.booking.company,
      this.getPresentationFromForm(),
      this.fitFormGroup.value.fitAppearance.representatives,
      this.fitFormGroup.value.detailedData.desiredBranches,
      this.fitFormGroup.value.fitAppearance.resources,
      this.fitFormGroup.value.contactAndRemarks.remarks,
      this.fitFormGroup.value.fitAppearance.additionalInfo,
      this.fitFormGroup.value.detailedData.description,
      this.fitFormGroup.value.detailedData.providesSummerJob,
      this.fitFormGroup.value.detailedData.providesThesis,
      this.fitFormGroup.value.detailedData.branch,
      this.fitFormGroup.value.detailedData.phoneNumber,
      this.fitFormGroup.value.detailedData.email,
      this.fitFormGroup.value.detailedData.homepage,
      this.fitFormGroup.value.detailedData.logo,
      this.fitFormGroup.value.detailedData.establishmentsCountInt,
      this.fitFormGroup.value.detailedData.establishmentsInt,
      this.fitFormGroup.value.detailedData.establishmentsCountAut,
      this.fitFormGroup.value.detailedData.establishmentsAut,
      false
    );
  }

  private getContactFromForm(): Contact {
    return new Contact(
      this.fitFormGroup.value.contactAndRemarks.fitContactFirstName,
      this.fitFormGroup.value.contactAndRemarks.fitContactLastName,
      this.fitFormGroup.value.contactAndRemarks.fitContactGender,
      this.fitFormGroup.value.contactAndRemarks.fitContactEmail,
      this.fitFormGroup.value.contactAndRemarks.fitContactPhoneNumber
    );
  }

  private getPresentationFromForm(): Presentation {
    let fitPackage: Package = this.fitFormGroup.value.packagesAndLocation.fitPackage;

    if (fitPackage != null && fitPackage.discriminator === FitPackage.LecturePack) {
      return new Presentation(
        null,
        this.fitFormGroup.value.packagesAndLocation.presentationTitle,
        this.fitFormGroup.value.packagesAndLocation.presentationDescription,
        false,
        this.fitFormGroup.value.packagesAndLocation.presentationFile,
        this.fitFormGroup.value.packagesAndLocation.presentationBranches
      );
    } else {
      return null;
    }
  }

  private fillFormWithBooking(): void {

    if (this.booking.company.contact.gender == null || this.booking.company.contact.gender === '') {
      this.booking.company.contact.gender = 'M';
    }

    this.fitFormGroup.patchValue({
      detailedData: {
        phoneNumber: this.booking.phoneNumber,
        email: this.booking.email,
        homepage: this.booking.homepage,
        logo: this.booking.logo,
        branch: this.booking.branch,
        description: this.booking.companyDescription,
        establishmentsCountAut: this.booking.establishmentsCountAut,
        establishmentsCountInt: this.booking.establishmentsCountInt,
        providesSummerJob: this.booking.providesSummerJob,
        providesThesis: this.booking.providesThesis,
      },
      fitAppearance: {
        additionalInfo: this.booking.additionalInfo,
      },
      packagesAndLocation: {
        fitPackage: this.booking.fitPackage,
        location: this.booking.location,
      },
      contactAndRemarks: {
        fitContactGender: this.booking.contact.gender,
        fitContactFirstName: this.booking.contact.firstName,
        fitContactLastName: this.booking.contact.lastName,
        fitContactEmail: this.booking.contact.email,
        fitContactPhoneNumber: this.booking.contact.phoneNumber,
        remarks: this.booking.remarks
      }
    });

    if (this.booking.presentation != null) {
      this.fitFormGroup.patchValue({
        packagesAndLocation: {
          presentationTitle: this.booking.presentation.title,
          presentationDescription: this.booking.presentation.description,
          presentationFile: this.booking.presentation.file,
          presentationBranches: this.booking.presentation.branches
        }
      });
    }

    (<FormGroup> this.fitFormGroup.controls['detailedData'])
      .setControl('establishmentsAut', this.fb.array(this.booking.establishmentsAut));

    (<FormGroup> this.fitFormGroup.controls['detailedData'])
      .setControl('establishmentsInt', this.fb.array(this.booking.establishmentsInt));

    (<FormGroup> this.fitFormGroup.controls['detailedData'])
      .setControl('desiredBranches', this.fb.array(this.booking.branches));

    (<FormGroup> this.fitFormGroup.controls['fitAppearance'])
      .setControl('representatives', this.fb.array(this.booking.representatives
        .map(r => RepresentativeMapper.mapRepresentativeToFormGroup(r))));

    (<FormGroup> this.fitFormGroup.controls['fitAppearance'])
      .setControl('resources', this.fb.array(this.booking.resources));

    // triggers bookingFilled Event to notify all other components
    this.accountManagementService.bookingIsFilled();
  }

  private getFormGroupForStep(step: FitRegistrationStep): FormGroup {
    switch (step) {
      case FitRegistrationStep.GeneralData:
        return this.fitFormGroup.get('generalData') as FormGroup;
      case FitRegistrationStep.DetailedData:
        return this.fitFormGroup.get('detailedData') as FormGroup;
      case FitRegistrationStep.FitAppearance:
        return this.fitFormGroup.get('fitAppearance') as FormGroup;
      case FitRegistrationStep.PackagesAndLocation:
        return this.fitFormGroup.get('packagesAndLocation') as FormGroup;
      case FitRegistrationStep.ContactAndRemarks:
        return this.fitFormGroup.get('contactAndRemarks') as FormGroup;
    }
  }
}
