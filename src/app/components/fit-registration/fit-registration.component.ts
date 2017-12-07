import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FitRegistrationStep } from '../../core/model/enums/fit-registration-step';
import { BookingDAO } from '../../core/dao/booking.dao';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Booking } from '../../core/model/booking';
import { Company } from '../../core/model/company';
import { Address } from '../../core/model/adress';
import { Contact } from '../../core/model/contact';

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

  public constructor(private router: Router,
                     private bookingDAO: BookingDAO,
                     private fb: FormBuilder) {
    this.currentStep = FitRegistrationStep.GeneralData;

    this.fitFormGroup = fb.group({
      generalData: fb.group({
        companyName: ['', Validators.required],
        street: ['', Validators.required],
        streetNumber: ['', Validators.required],
        zipCode: ['', Validators.required],
        location: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        homepage: ['', Validators.required],
        logo: ['', Validators.required],
      }),
      detailedData: fb.group({
        branch: ['', Validators.required],
        description: ['', Validators.required],
        establishmentsAut: this.fb.array([]),
        establishmentCountAut: [0, Validators.required],
        establishmentsInt: this.fb.array([]),
        establishmentCountInt: [0],
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
        package: [],
      }),
      contactAndRemarks: fb.group({
        firstName: [],
        lastName: [],
        email: [],
        phone: [],
        remarks: [''],
        termsAccepted: [false]
      })
    });
  }

  public ngOnInit() {
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

    let booking: Booking = this.getBookingOfForm();
    console.log(booking);

    await this.bookingDAO.createBooking(booking);
    this.router.navigateByUrl('fit/anmeldung-erfolgreich');
  }

  private getBookingOfForm(): Booking {
    return new Booking(
      1,
      1,
      1,
      this.getCompanyOfForm(),
      null,
      null,
      false,
      this.fitFormGroup.value.contactAndRemarks.remarks,
      this.fitFormGroup.value.fitAppearance.additionalInfo,
      this.fitFormGroup.value.detailedData.description,
      this.fitFormGroup.value.detailedData.providesSummerJob,
      this.fitFormGroup.value.detailedData.providesThesis
    );
  }

  private getCompanyOfForm(): Company {
    return new Company(
      this.fitFormGroup.value.generalData.companyName,
      this.fitFormGroup.value.detailedData.branch,
      this.getCompanyAddressOfForm(),
      this.getContactOfForm(),
      this.fitFormGroup.value.generalData.phone,
      this.fitFormGroup.value.generalData.email,
      this.fitFormGroup.value.generalData.homepage,
      this.fitFormGroup.value.generalData.logo,
      this.fitFormGroup.value.detailedData.establishmentCountInt,
      this.fitFormGroup.value.detailedData.establishmentsInt,
      this.fitFormGroup.value.detailedData.establishmentCountAut,
      this.fitFormGroup.value.detailedData.establishmentsAut
    )
  }

  private getCompanyAddressOfForm(): Address {
    return new Address(
      this.fitFormGroup.value.generalData.city,
      this.fitFormGroup.value.generalData.zipCode,
      this.fitFormGroup.value.generalData.street,
      this.fitFormGroup.value.generalData.houseNumber,
      this.fitFormGroup.value.generalData.addition,
    );
  }

  private getContactOfForm(): Contact {
    return new Contact(
      this.fitFormGroup.value.contactAndRemarks.firstName,
      this.fitFormGroup.value.contactAndRemarks.lastName,
      this.fitFormGroup.value.contactAndRemarks.email,
      this.fitFormGroup.value.contactAndRemarks.phone
    );
  }
}
