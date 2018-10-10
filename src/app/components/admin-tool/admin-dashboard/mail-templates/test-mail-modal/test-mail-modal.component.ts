import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Email} from '../../../../../core/model/email';
import {EmailDAO} from '../../../../../core/dao/email.dao';
import {CompaniesService} from '../../../services/companies.service';
import {BookingsService} from '../../../services/bookings.service';
import {Company} from '../../../../../core/model/company';
import {Booking} from '../../../../../core/model/booking';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { BaseSubscriptionComponent } from '../../../../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-test-mail-modal',
  templateUrl: './test-mail-modal.component.html',
  styleUrls: ['./test-mail-modal.component.scss']
})
export class TestMailModalComponent extends BaseSubscriptionComponent implements OnInit, OnChanges {

  @Input()
  public email: Email;

  public entityType: string;
  public selectedId: number;
  public companies: Company[] = [];
  public bookings: Booking[] = [];

  public emailFormGroup: FormGroup;
  public isLoading: boolean = false;

  public constructor(private emailDAO: EmailDAO,
                     private companiesService: CompaniesService,
                     private fb: FormBuilder,
                     private toastr: ToastrService,
                     private bookingsService: BookingsService) {
    super();
  }

  public ngOnInit(): void {
    this.companies = this.companiesService.companies.getValue();
    this.bookings = this.bookingsService.bookings.getValue();

    this.addSub(this.companiesService.companies.subscribe(c => this.companies = c));
    this.addSub(this.bookingsService.bookings.subscribe(b => this.bookings = b));

    this.emailFormGroup = this.fb.group({
      emailAddress: this.fb.control('', Validators.email)
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['email'] && this.email != null) {
      if (this.email.availableVariables.length !== 0) {
        this.entityType = this.email.availableVariables[0].entity;

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

  public async sendEmail(): Promise<void> {
    if (this.emailFormGroup.valid) {
      let emailAddress = this.emailFormGroup.value.emailAddress;
      this.isLoading = true;
      await this.emailDAO.sendTestMail(this.email.id, emailAddress, this.selectedId, this.entityType);
      this.isLoading = false;
      this.toastr.success('Die Test-Mail wurde erfolgreich verschickt.', 'E-Mail gesendet');
    } else {
      this.toastr.error('Die eingegebene E-Mail ist nicht korrekt.', 'Ungültige Eingabe');
    }
  }
}
