import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Event } from '../../../core/model/event';
import { Company } from '../../../core/model/company';
import { Booking } from '../../../core/model/booking';
import { EventService } from '../../../core/app-services/event.service';
import { AccountManagementService } from '../../../core/app-services/account-managenment.service';
import { Graduate } from '../../../core/model/graduate';
import { ModalWindowService } from '../../../core/app-services/modal-window.service';
import { BaseOnDeactivateAlertComponent } from '../../../core/base-components/base-on-deactivate-alert.component';

@Component({
  selector: 'fit-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent extends BaseOnDeactivateAlertComponent implements OnInit {

  public graduate: Graduate = null;
  public company: Company = null;
  public booking: Booking = null;
  public event: Event = null;

  public isGraduate: boolean = false;

  public constructor(private accountManagementService: AccountManagementService,
                     private fb: FormBuilder,
                     private eventService: EventService,
                     private modalWindowService: ModalWindowService,
                     private router: Router) {
    super();
  }

  public ngOnInit(): void {
    this.isGraduate = this.accountManagementService.isGraduate;

    if (this.isGraduate) {
      this.graduate = this.accountManagementService.graduate;
    } else {
      this.company = this.accountManagementService.getCompany();
      if (this.accountManagementService.currentBookingExists) {
        this.booking = this.accountManagementService.booking;
      }
    }

    if (this.graduate == null && this.company == null) {
      this.router.navigate(['/konto', 'login']);
    }
  }

  public editModeChanged(value: boolean): void {
    this.unsavedChangesExist = value;
  }

  public logout(): void {
    this.accountManagementService.logoutMember();
    this.router.navigate(['/konto', 'login']);
  }
}
