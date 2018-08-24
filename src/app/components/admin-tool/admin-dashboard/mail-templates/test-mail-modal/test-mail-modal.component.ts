import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Email } from '../../../../../core/model/email';
import { EmailDAO } from '../../../../../core/dao/email.dao';
import { CompaniesService } from '../../../services/companies.service';
import { BookingsService } from '../../../services/bookings.service';
import { Company } from '../../../../../core/model/company';
import { Booking } from '../../../../../core/model/booking';

@Component({
  selector: 'fit-test-mail-modal',
  templateUrl: './test-mail-modal.component.html',
  styleUrls: ['./test-mail-modal.component.scss']
})
export class TestMailModalComponent implements OnInit, OnChanges {

  @Input()
  public email: Email;

  public emailAddress: string;
  public entityType: string;

  public selectedId: number;
  public companies: Company[];
  public bookings: Booking[];

  public constructor(private emailDAO: EmailDAO,
                     private companiesService: CompaniesService,
                     private bookingsService: BookingsService) {
  }

  public ngOnInit(): void {
    this.companies = this.companiesService.companies.getValue();
    this.bookings = this.bookingsService.bookings.getValue();

    this.companiesService.companies.subscribe(c => this.companies = c);
    this.bookingsService.bookings.subscribe(b => this.bookings = b);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['email'] && this.email != null) {
      if (this.email.availableVariables.length !== 0) {
        this.entityType = this.email.availableVariables.pop().entity;

        switch (this.entityType) {
          case 'Company':
            if (this.companies.length !== 0) {
              this.selectedId = this.companies[0].id;
            }
            break;
          case 'Booking':
            if (this.bookings.length !== 0) {
              this.selectedId = this.bookings[0].id;
            }
            break;
        }
      }
    }
  }

  public sendEmail(): void {
    this.emailDAO.sendTestMail(this.email.id, this.emailAddress, this.selectedId, this.entityType);
  }
}
