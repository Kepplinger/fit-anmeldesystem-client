import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FitRegistrationStep } from '../../core/model/enums/fit-registration-step';
import { BookingDAO } from '../../core/dao/booking-dao.service';
import { Booking } from '../../core/model/booking';
import { Company } from '../../core/model/company';
import { Presentation } from '../../core/model/presentation';
import { Address } from '../../core/model/adress';
import { Contact } from '../../core/model/contact';
import { Person } from 'app/core/model/person';
import { DetailValue } from '../../core/model/detail-value';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this.currentStep = FitRegistrationStep.DetailedData;

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
        establishmentsAut: ['', Validators.required],
        establishmentAutCount: [0, Validators.required],
        establishmentsInt: [''],
        establishmentIntCount: [0],
        desiredBranches: [''],
        providing: ['']
      }),
      fitAppearance: fb.group({}),
      packagesAndLocation: fb.group({}),
      contactAndRemarks: fb.group({})
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

    // TODO replace dummy
    let booking = new Booking(
      1,
      new Company(
        'Comp1',
        'voi gmiadlich',
        new Address(
          'Leonding',
          '9090',
          'irgendwo 77',
        ),
        new Contact(
          new Person(
            'Ors**',
            'midOhrn',
            'ohren@ohr.en',
            'abcd',
            '06607000'
          ),
        ),
        '06607000',
        'comp@comp.at',
        'https://ts-proto-shop.herokuapp.com',
        'wos is des?',
        '3?'
      ),
      23,
      new Presentation(
        '257',
        'De anzig wohre Presentation',
        'abcdefgz',
        true
      ),
      2,
      [
        new DetailValue(
          1,
          'false'
        ),
        new DetailValue(
          2,
          'true'
        ),
      ],
      true
    );

    await this.bookingDAO.createBooking(booking);
    this.router.navigateByUrl('fit/anmeldung-erfolgreich');
  }
}
