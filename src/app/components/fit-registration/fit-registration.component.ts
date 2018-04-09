import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FitRegistrationStep } from '../../core/model/enums/fit-registration-step';
import { BookingDAO } from '../../core/dao/booking.dao';
import { Booking } from '../../core/model/booking';
import { Company } from '../../core/model/company';
import { Address } from '../../core/model/address';
import { Contact } from '../../core/model/contact';
import { Presentation } from '../../core/model/presentation';
import { Event } from '../../core/model/event';
import { Package } from '../../core/model/package';
import { FitPackage } from '../../core/model/enums/fit-package';
import { AppConfig } from '../../core/app-config/app-config.service';
import { EventDAO } from '../../core/dao/event.dao';
import { ModalWindowService } from '../../core/app-services/modal-window.service';
import { FitRegistrationService } from '../../core/app-services/fit-registration.service';
import { EventService } from '../../core/app-services/event.service';
import { ToastrService } from 'ngx-toastr';
import { FormHelper } from '../../core/app-helper/form-helper';
import 'rxjs/add/operator/map';

@Component({
  selector: 'fit-fit-registration',
  templateUrl: './fit-registration.component.html',
  styleUrls: ['./fit-registration.component.scss']
})
export class FitRegistrationComponent implements OnInit {

  // necessary for template-usage
  Step = FitRegistrationStep;

  public currentStep: FitRegistrationStep;
  public fitFormGroup: FormGroup;
  public event: Event;
  public steps: FitRegistrationStep[] = [
    FitRegistrationStep.GeneralData,
    FitRegistrationStep.DetailedData,
    FitRegistrationStep.FitAppearance,
    FitRegistrationStep.PackagesAndLocation,
    FitRegistrationStep.ContactAndRemarks
  ];

  public isFormTouched: boolean = false;
  public isEditMode: boolean;

  public visitedSteps: FitRegistrationStep[] = [];

  private booking: Booking = new Booking();

  public constructor(private router: Router,
                     private bookingDAO: BookingDAO,
                     private eventDAO: EventDAO,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private toastr: ToastrService,
                     private bookingRegistrationService: FitRegistrationService,
                     private modalWindowService: ModalWindowService,
                     private fb: FormBuilder) {
    this.currentStep = FitRegistrationStep.GeneralData;
    this.visitedSteps.push(FitRegistrationStep.GeneralData);

    this.booking = this.bookingRegistrationService.booking;
    this.isEditMode = this.bookingRegistrationService.editMode;

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
        logoUrl: [''],
        description: [''],
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
        additionalInfo: ['', Validators.required],
        resources: this.fb.array([])
      }),
      packagesAndLocation: fb.group({
        fitPackage: [null, Validators.required],
        location: [null, Validators.required],
        presentationTitle: [''],
        presentationDescription: [''],
        presentationFile: ['']
      }),
      contactAndRemarks: fb.group({
        gender: [this.booking.company.contact.gender],
        firstName: [this.booking.company.contact.firstName, Validators.required],
        lastName: [this.booking.company.contact.lastName, Validators.required],
        email: [this.booking.company.contact.email, [Validators.required, Validators.email]],
        phoneNumber: [this.booking.company.contact.phoneNumber, Validators.required],
        remarks: [''],
        termsAccepted: [false, Validators.requiredTrue]
      })
    });
  }

  public async ngOnInit(): Promise<void> {
    this.event = this.eventService.currentEvent.getValue();

    if (this.booking.id != null) {
      let useOldBooking = await this.modalWindowService.confirm(
        'Anmeldung von letzten Mal übernehemen?',
        'Wollen Sie die Daten von Ihrer letzten Anmeldung beim FIT als Vorlage nehmen?',
        {
          closableByDimmer: false,
          movable: false,
          labels: {ok: 'Verwenden', cancel: 'Nicht verwenden'}
        }
      );

      if (useOldBooking) {
        this.fillFormWithBooking()
      }
    }
  }

  public setCurrentPage(step: FitRegistrationStep) {
    this.currentStep = step;

    if (this.visitedSteps.indexOf(step) === -1) {
      this.visitedSteps.push(step);
    }
    window.scrollTo(0, 0);
  }

  public nextPage() {
    this.setCurrentPage(this.currentStep + 1)
  }

  public previousPage() {
    this.setCurrentPage(this.currentStep - 1)
  }

  public getProgress(): number {

    const progressFactor: number = 15;
    let progress: number = 0;

    progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('detailedData'));
    progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('fitAppearance'));
    progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('packagesAndLocation'));

    if (this.visitedSteps.indexOf(FitRegistrationStep.ContactAndRemarks) !== -1) {
      progress += FormHelper.getErrorCount(<FormGroup>this.fitFormGroup.get('contactAndRemarks'));
    } else {
      progress += 5;
    }

    progress += 5 - this.visitedSteps.length;

    return (progressFactor - progress) / progressFactor;
  }

  public async submitBooking(): Promise<void> {

    if (this.fitFormGroup.valid) {
      let booking: Booking = this.getBookingFromForm();
      await this.bookingDAO.persistBooking(booking);
      this.router.navigateByUrl('fit/anmeldung-erfolgreich');
    } else {
      this.toastr.error('Bitte überprüfen Sie Ihre Eingaben.', 'Anmeldung fehlgeschlagen!');
      this.isFormTouched = true;
      FormHelper.validateAllFormFields(this.fitFormGroup);
    }
  }

  private getBookingFromForm(): Booking {
    return new Booking(
      this.event,
      this.fitFormGroup.value.packagesAndLocation.fitPackage,
      this.fitFormGroup.value.packagesAndLocation.location,
      this.getCompanyFromForm(),
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

  private getCompanyFromForm(): Company {
    return new Company(
      this.getCompanyAddressFromForm(),
      this.getContactFromForm(),
      this.fitFormGroup.value.generalData.companyName,
      false
    )
  }

  private getCompanyAddressFromForm(): Address {
    return new Address(
      this.fitFormGroup.value.generalData.city,
      this.fitFormGroup.value.generalData.zipCode,
      this.fitFormGroup.value.generalData.street,
      this.fitFormGroup.value.generalData.streetNumber,
      this.fitFormGroup.value.generalData.addressAdditions,
    );
  }

  private getContactFromForm(): Contact {
    return new Contact(
      this.fitFormGroup.value.contactAndRemarks.firstName,
      this.fitFormGroup.value.contactAndRemarks.lastName,
      this.fitFormGroup.value.contactAndRemarks.gender,
      this.fitFormGroup.value.contactAndRemarks.email,
      this.fitFormGroup.value.contactAndRemarks.phoneNumber
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
      )
    } else {
      return null;
    }
  }

  private fillFormWithBooking(): void {

    // let temp = new FormArray(this.booking.establishmentsAut.map(e => new FormControl(e)))

    console.log(this.booking.establishmentsAut);

    this.fitFormGroup.patchValue({
      detailedData: {
        phoneNumber: this.booking.phoneNumber,
        email: this.booking.email,
        homepage: this.booking.homepage,
        logoUrl: this.booking.logo,
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
        remarks: this.booking.remarks
      }
    });

    if (this.booking.presentation != null) {
      this.fitFormGroup.patchValue({
        packagesAndLocation: {
          presentationTitle: this.booking.presentation.title,
          presentationDescription: this.booking.presentation.description,
          // presentationFile: this.booking.presentation.fileUrl
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
      .setControl('representatives', this.fb.array(this.booking.representatives));

    (<FormGroup> this.fitFormGroup.controls['fitAppearance'])
      .setControl('resources', this.fb.array(this.booking.resources));

    this.bookingRegistrationService.bookingIsFilled();
  }
}
