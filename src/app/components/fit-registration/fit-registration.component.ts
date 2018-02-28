import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { ArrayUtils } from '../../core/utils/array-utils';
import { FolderInfo } from '../../core/model/folder-info';
import { EventDAO } from '../../core/dao/event.dao';
import { ModalWindowService } from '../../core/app-services/modal-window.service';
import { FitRegistrationService } from '../../core/app-services/fit-registration.service';
import { EventService } from '../../core/app-services/event.service';

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

  private booking: Booking = new Booking();

  public constructor(private router: Router,
                     private bookingDAO: BookingDAO,
                     private eventDAO: EventDAO,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private bookingRegistrationService: FitRegistrationService,
                     private modalWindowService: ModalWindowService,
                     private fb: FormBuilder) {
    this.currentStep = FitRegistrationStep.GeneralData;

    this.booking = this.bookingRegistrationService.booking;

    this.fitFormGroup = fb.group({
      generalData: fb.group({
        companyName: [this.booking.company.name, Validators.required],
        street: [this.booking.company.address.street, Validators.required],
        streetNumber: [this.booking.company.address.streetNumber, Validators.required],
        zipCode: [this.booking.company.address.zipCode, Validators.required],
        city: [this.booking.company.address.city, Validators.required],
        addressAdditions: [this.booking.company.address.addition, Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        homepage: ['', Validators.required],
        logoUrl: ['', Validators.required],
      }),
      detailedData: fb.group({
        branch: ['', Validators.required],
        description: ['', Validators.required],
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
        location: [],
        presentationTitle: [''],
        presentationDescription: [''],
        presentationFile: ['']
      }),
      contactAndRemarks: fb.group({
        gender: [this.booking.company.contact.gender],
        firstName: [this.booking.company.contact.firstName, Validators.required],
        lastName: [this.booking.company.contact.lastName, Validators.required],
        email: [this.booking.company.contact.email, Validators.required],
        phoneNumber: [this.booking.company.contact.phoneNumber, Validators.required],
        remarks: [''],
        termsAccepted: [false, Validators.requiredTrue]
      })
    });
  }

  public async ngOnInit(): Promise<void> {
    this.event = this.eventService.currentEvent.getValue();

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

  public setCurrentPage(step: FitRegistrationStep) {
    this.currentStep = step;
  }

  public nextPage() {
    this.currentStep += 1;
  }

  public previousPage() {
    this.currentStep -= 1;
  }

  public async submitForm(): Promise<void> {

    let booking: Booking = this.getBookingFromForm();
    console.log(booking);

    await this.bookingDAO.createBooking(booking);
    this.router.navigateByUrl('fit/anmeldung-erfolgreich');
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
      false
    );
  }

  private getCompanyFromForm(): Company {
    return new Company(
      this.getCompanyAddressFromForm(),
      this.getContactFromForm(),
      this.getFolderInfoFromForm(),
      this.fitFormGroup.value.generalData.companyName,
      false
    )
  }

  private getFolderInfoFromForm(): FolderInfo {
    return new FolderInfo(
      this.fitFormGroup.value.detailedData.branch,
      this.fitFormGroup.value.generalData.phoneNumber,
      this.fitFormGroup.value.generalData.email,
      this.fitFormGroup.value.generalData.homepage,
      this.fitFormGroup.value.generalData.logo != null ? 'a' : 'b', // TODO replace
      this.fitFormGroup.value.detailedData.establishmentsCountInt,
      this.fitFormGroup.value.detailedData.establishmentsInt.map(e => e.value),
      this.fitFormGroup.value.detailedData.establishmentsCountAut,
      this.fitFormGroup.value.detailedData.establishmentsAut.map(e => e.value)
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
    this.fitFormGroup.patchValue({
      generalData: {
        phoneNumber: this.booking.company.folderInfo.phoneNumber,
        email: this.booking.company.folderInfo.email,
        homepage: this.booking.company.folderInfo.homepage,
        // logoUrl: this.booking.company.folderInfo.logo
      },
      detailedData: {
        branch: this.booking.company.folderInfo.branch,
        description: this.booking.companyDescription,
        // establishmentsAut: this.booking.company.folderInfo.establishmentsAut,
        // establishmentsCountAut: this.booking.company.folderInfo.establishmentsCountAut,
        // establishmentsInt: this.booking.company.folderInfo.establishmentsInt,
        // establishmentsCountInt: this.booking.company.folderInfo.establishmentsCountInt,
        // desiredBranches: this.booking.branches,
        providesSummerJob: this.booking.providesSummerJob,
        providesThesis: this.booking.providesThesis,
      },
      fitAppearance: {
        // representatives: this.booking.representatives,
        additionalInfo: this.booking.additionalInfo,
        // resources: this.booking.resources
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
  }
}
