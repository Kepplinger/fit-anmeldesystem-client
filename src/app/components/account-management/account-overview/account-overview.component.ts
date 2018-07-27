import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Event } from '../../../core/model/event';
import { Company } from '../../../core/model/company';
import { Booking } from '../../../core/model/booking';
import { EventService } from '../../../core/app-services/event.service';
import { AccountManagementService } from '../../../core/app-services/account-managenment.service';
import { Graduate } from '../../../core/model/graduate';
import { ModalWindowService } from '../../../core/app-services/modal-window.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'fit-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit {

  public graduate: Graduate = null;
  public company: Company = null;
  public booking: Booking = null;
  public event: Event = null;

  public isGraduate: boolean = false;
  public wereChangesMade: boolean = false;

  public constructor(private accountManagementService: AccountManagementService,
                     private fb: FormBuilder,
                     private eventService: EventService,
                     private modalWindowService: ModalWindowService,
                     public platformLocation: PlatformLocation,
                     private router: Router) {
  }

  public ngOnInit(): void {
    this.isGraduate = this.accountManagementService.isGraduate;

    this.platformLocation.onPopState(() => {
      this.accountManagementService.logoutMember();
    });

    if (this.isGraduate) {
      this.graduate = this.accountManagementService.graduate;

      if (this.graduate == null) {
        this.router.navigate(['/konto', 'login']);
      }
    } else {
      this.company = this.accountManagementService.getCompany();

      if (this.company == null) {
        this.router.navigate(['/konto', 'login']);
      }

      if (this.accountManagementService.currentBookingExists) {
        this.booking = this.accountManagementService.booking;
      }
    }
  }

  public logout(): void {
    this.accountManagementService.logoutMember();
    this.router.navigate(['konto', 'login']);
  }

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification() {
    return !this.wereChangesMade;
  }

  public async canDeactivate() {
    if (this.wereChangesMade) {
      return confirm('You have unsaved changes! If you leave, your changes will be lost.');
    }
  }
}
