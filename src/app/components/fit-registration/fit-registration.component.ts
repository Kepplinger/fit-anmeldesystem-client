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
import { RepresentativeMapper } from '../../core/model/mapper/representative-mapper';
import { FormWarnings } from '../../core/app-helper/helper-model/form-warnings';
import { IsAccepted } from '../../core/model/enums/is-accepted';
import { DataUpdateNotifier } from '../../core/app-services/data-update-notifier';
import { Representative } from '../../core/model/representative';
import { BaseOnDeactivateAlertComponent } from '../../core/base-components/base-on-deactivate-alert.component';
import { UserAuthorizationService } from '../../core/app-services/user-authorization.service';

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
export class FitRegistrationComponent extends BaseOnDeactivateAlertComponent implements OnInit {

  // necessary for template-usage
  public Step = FitRegistrationStep;
  public IsAccepted = IsAccepted;

  public currentStep: FitRegistrationStep;
  public fitFormGroup: FormGroup;
  public event: Event;

  public steps: FitStep[];

  public isFormTouched: boolean = false;
  public isEditMode: boolean;
  public isAdminMode: boolean;
  public isBookingTransmitting: boolean = false;

  private booking: Booking = new Booking();

  public constructor(private router: Router,
                     private bookingDAO: BookingDAO,
                     private eventDAO: EventDAO,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private toastr: ToastrService,
                     private dataUpdateNotifier: DataUpdateNotifier,
                     private accountManagementService: AccountManagementService,
                     private modalWindowService: ModalWindowService,
                     private fb: FormBuilder) {
    super();

    // creates a FitStep Array out of the ordered steps
    this.steps = getOrderedFitRegistrationSteps().map(s => {
      return {
        step: s,
        isValid: true,
        wasValidated: false,
        isVisited: false // TODO is this really needed?
      } as FitStep;
    });

    // visits first step and validates it as true
    this.currentStep = FitRegistrationStep.GeneralData;
    this.steps.find(s => s.step === this.currentStep).isVisited = true;
    this.steps.find(s => s.step === this.currentStep).wasValidated = true;

    this.booking = this.accountManagementService.booking;
    this.isEditMode = this.accountManagementService.currentBookingExists;
    this.isAdminMode = this.accountManagementService.isAdminMode;

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
        logo: [null],
        description: ['', [Validators.required, fitCompanyDescriptionValidator(15, 65)]],
        establishmentsAut: this.fb.array([]),
        establishmentsCountAut: [0, Validators.required],
        establishmentsInt: this.fb.array([]),
        establishmentsCountInt: [0],
        desiredBranches: this.fb.array([]),
        providesSummerJob: [false],
        providesThesis: [false]
      }),
      fitAppearance: fb.group({
        representatives: this.fb.array([
          RepresentativeMapper.mapRepresentativeToFormGroup(
            new Representative('', '', null)
          )]),
        additionalInfo: [''],
        resources: this.fb.array([])
      }),
      packagesAndLocation: fb.group({
        fitPackage: [null, Validators.required],
        location: [null],
        presentationTitle: [''],
        presentationDescription: [''],
        presentationBranches: this.fb.array([]),
        presentationFile: [null]
      }),
      contactAndRemarks: fb.group({
        fitContactGender: [this.booking.company.contact.gender],
        fitContactFirstName: [this.booking.company.contact.firstName, Validators.required],
        fitContactLastName: [this.booking.company.contact.lastName, Validators.required],
        fitContactEmail: [this.booking.company.contact.email, [Validators.required, Validators.email]],
        fitContactPhoneNumber: [this.booking.company.contact.phoneNumber, Validators.required],
        remarks: [''],
        termsAccepted: [this.isEditMode || this.isAdminMode, Validators.requiredTrue]
      })
    });
  }

  public async ngOnInit(): Promise<void> {
    this.unsavedChangesExist = !this.isAdminMode;

    this.event = this.eventService.currentEvent.getValue();
    this.addSub(this.eventService.currentEvent.subscribe((event: Event) => this.event = event));

    let useOldBooking: boolean = false;

    if (this.booking.id != null && !this.isEditMode && !this.isAdminMode) {
      useOldBooking = await this.modalWindowService.confirm(
        'Anmeldung von letzten Mal übernehemen?',
        'Wollen Sie die Daten von Ihrer letzten Anmeldung beim FIT als Vorlage nehmen?',
        {
          closableByDimmer: false,
          movable: false,
          labels: {ok: 'Verwenden', cancel: 'Nicht verwenden'}
        });
    }

    if (useOldBooking || this.isAdminMode || this.isEditMode) {
      this.fillFormWithBooking();
    }

    if (this.isEditMode || this.isAdminMode) {
      for (let step of this.steps) {
        this.validateStepWhenTrue(step.step);
        step.isVisited = true;
      }
    }
  }

  public async setCurrentPage(oldStep: FitRegistrationStep, newStep: FitRegistrationStep): Promise<void> {
    let newStepObject: FitStep = this.steps.find(s => s.step === newStep);
    let showWarning: boolean = false;
    let switchToNextStep: boolean = true;

    if (oldStep < newStep) {
      for (let i = FitRegistrationStep.GeneralData; i < newStep; i++) {
        showWarning = !this.validateStep(i) || showWarning;
      }
    } else {
      this.validateStep(oldStep);
    }

    if (showWarning) {
      switchToNextStep = await this.modalWindowService.confirm(
        `<h2 class="text-bold text-dark">Vorsicht!</h2>`,
        ModalTemplateCreatorHelper.getNextStepWarning(),
        ModalTemplateCreatorHelper.getBasicModalOptions('Trotzdem fortfahren', 'Abbrechen')
      );
    }

    if (switchToNextStep) {
      this.validateStepWhenTrue(newStep);
      newStepObject.isVisited = true;

      this.currentStep = newStep;
      window.scrollTo(0, 0);
    } else {
      let sortedSteps: FitStep[] = this.steps
        .filter(s => !s.isValid && s.step <= newStep && s.step >= oldStep)
        .sort((a, b) => a.step - b.step);

      // navigate to the next invalid step
      if (sortedSteps.length !== 0) {
        this.currentStep = sortedSteps[0].step;
        window.scrollTo(0, 0);
      }
    }
  }

  public validateStepWhenTrue(step: FitRegistrationStep): void {
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

  public async acceptBooking(): Promise<void> {
    let booking = await this.bookingDAO.acceptBooking(this.booking, IsAccepted.Accepted);
    this.booking.isAccepted = booking.isAccepted;
    this.booking.timestamp = booking.timestamp;
    this.accountManagementService.setAdminBooking(this.booking);
  }

  public async rejectBooking(): Promise<void> {
    let result = await this.modalWindowService.confirm(
      'Anmeldung ablehenen!',
      `Sind sie sich sicher, dass sie die <span class="text-danger">Anmeldung ablehenen</span> wollen!`,
      ModalTemplateCreatorHelper.getBasicModalOptions('Ablehenen', 'Abbrechen')
    );

    if (result) {
      let booking = await this.bookingDAO.acceptBooking(this.booking, IsAccepted.Rejected);
      this.booking.isAccepted = booking.isAccepted;
      this.booking.timestamp = booking.timestamp;
      this.accountManagementService.setAdminBooking(this.booking);
    }
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

    progress += 5 - this.steps.filter(s => s.wasValidated).length;

    return (progressFactor - progress) / progressFactor;
  }

  /**
   * Validates the whole form, and submits the booking afterwards.
   * @returns {Promise<void>}
   */
  public async submitBooking(): Promise<void> {

    // validate all steps (for visual reasons)
    for (let step of this.steps) {
      this.validateStepWhenTrue(step.step);
      step.wasValidated = true;
    }

    if (this.fitFormGroup.valid) {

      let submitBooking: boolean = true;

      let formWarnings = {
        noLogo: this.fitFormGroup.get('detailedData').value.logo == null,
        noRepresentativeLogos: this.fitFormGroup.get('fitAppearance').value
          .representatives.some(r => r.image == null),
        noLocation: this.fitFormGroup.get('packagesAndLocation').value.location == null
      } as FormWarnings;

      if (formWarnings.noRepresentativeLogos || formWarnings.noLogo || formWarnings.noLocation) {
        submitBooking = await this.modalWindowService.confirm(
          `<h5 class="text-bold">Einige Felder sind noch nicht ausgefüllt!</h5>`,
          ModalTemplateCreatorHelper.getRegistrationWarning(formWarnings),
          ModalTemplateCreatorHelper.getBasicModalOptions('Anmeldung durchführen', 'Abbrechen'));
      }

      if (submitBooking) {
        let booking: Booking = this.getBookingFromForm();

        if (this.isEditMode || this.isAdminMode) {
          let initialBooking = this.accountManagementService.booking;
          booking.id = initialBooking.id;
          booking.timestamp = initialBooking.timestamp;
          booking.contact.id = initialBooking.contact.id;
          booking.contact.timestamp = initialBooking.contact.timestamp;
          booking.isAccepted = initialBooking.isAccepted;

          if (this.booking.presentation != null && booking.presentation != null) {
            booking.presentation.id = initialBooking.presentation.id;
            booking.presentation.timestamp = initialBooking.presentation.timestamp;
            booking.presentation.roomNumber = initialBooking.presentation.roomNumber;
          }
        }

        this.isBookingTransmitting = true;

        try {
          booking = await this.bookingDAO.persistBooking(booking);
        } finally {
          this.isBookingTransmitting = false;
        }

        this.unsavedChangesExist = false;

        if (this.isAdminMode) {
          this.dataUpdateNotifier.updateBooking(booking);
          this.router.navigate(['/admin-tool', 'anmeldungen']);
        } else if (this.isEditMode) {
          this.dataUpdateNotifier.updateBooking(booking);
          this.router.navigate(['/fit', 'änderung-erfolgreich']);
        } else {
          this.dataUpdateNotifier.addBooking(booking);
          this.router.navigate(['/fit', 'anmeldung-erfolgreich']);
        }
      }
    } else {
      this.toastr.error('Bitte überprüfen Sie Ihre Eingaben.', 'Anmeldung fehlgeschlagen!');
      this.isFormTouched = true;
      FormHelper.touchAllFormFields(this.fitFormGroup);

      for (let step of this.steps) {
        step.isValid = this.getFormGroupForStep(step.step).valid;
      }
    }
  }

  public navigateToAccount() {
    this.unsavedChangesExist = false;
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
      IsAccepted.Pending
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
        '',
        this.fitFormGroup.value.packagesAndLocation.presentationTitle,
        this.fitFormGroup.value.packagesAndLocation.presentationDescription,
        0,
        this.fitFormGroup.value.packagesAndLocation.presentationFile,
        this.fitFormGroup.value.packagesAndLocation.presentationBranches
      );
    } else {
      return null;
    }
  }

  private fillFormWithBooking(): void {

    // Gender Backup check (if everything breaks)
    if (this.booking.company.contact.gender == null || this.booking.company.contact.gender === '') {
      this.booking.company.contact.gender = 'M';
    }

    // Gender Backup check
    if (this.booking.contact.gender == null || this.booking.contact.gender === '') {
      this.booking.contact.gender = 'M';
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

    if (this.booking.presentation != null) {
      (<FormGroup> this.fitFormGroup.controls['packagesAndLocation'])
        .setControl('presentationBranches', this.fb.array(this.booking.presentation.branches));
    }

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

  private validateStep(step: FitRegistrationStep): boolean {
    let previousStepFormGroup = this.getFormGroupForStep(step);
    let previousStepObject = this.steps.find(s => s.step === step);

    FormHelper.touchAllFormFields(previousStepFormGroup);
    previousStepObject.isValid = previousStepFormGroup.valid;
    previousStepObject.wasValidated = true;

    return previousStepObject.isValid;
  }
}
