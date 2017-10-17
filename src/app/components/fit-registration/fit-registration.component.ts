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

@Component({
  selector: 'fit-fit-registration',
  templateUrl: './fit-registration.component.html',
  styleUrls: ['./fit-registration.component.scss']
})
export class FitRegistrationComponent implements OnInit {

  // necessary for template-usage
  Step = FitRegistrationStep;

  public currentPage: FitRegistrationStep;

  public constructor(private router: Router,
                     private bookingDAO: BookingDAO) {
    this.currentPage = FitRegistrationStep.PackagesAndLocation;
  }

  public ngOnInit() {
  }

  public setCurrentPage(page: number) {
    this.currentPage = page;
  }

  public nextPage() {
    this.currentPage += 1;
  }

  public previousPage() {
    this.currentPage -= 1;
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
