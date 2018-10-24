import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Booking } from '../../../../core/model/booking';
import { EventService } from '../../../../core/app-services/event.service';
import { SortHelper } from '../../../../core/app-helper/sort-helper';
import { ColumnSortCriteria } from '../../../../core/app-helper/helper-model/column-sort-criteria';
import { FitPackage } from '../../../../core/model/enums/fit-package';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { MemberLoginResponse } from '../../../../core/app-helper/helper-model/member-login-response';
import { IsAccepted } from '../../../../core/model/enums/is-accepted';
import { BookingsService } from '../../services/bookings.service';
import { BaseAdminRoleGuardComponent } from '../../../../core/base-components/base-admin-role-guard.component';
import { UserAuthorizationService } from '../../../../core/app-services/user-authorization.service';
import { MediaDAO } from '../../../../core/dao/media.dao';
import * as FileSaver from 'file-saver';
import { Event } from '../../../../core/model/event';

@Component({
  selector: 'fit-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent extends BaseAdminRoleGuardComponent implements OnInit {

  // for template use
  public IsAccepted = IsAccepted;

  @Output()
  public sorted = new EventEmitter();

  public displayedBookings: Booking[];
  public bookings: Booking[];

  public isLoading: boolean = false;
  public companyFilter: string = '';

  public displayedPackages: FitPackage[] = [FitPackage.BasicPack, FitPackage.SponsorPack, FitPackage.LecturePack];

  public constructor(protected adminAuthenticationService: UserAuthorizationService,
                     private eventService: EventService,
                     private mediaDAO: MediaDAO,
                     private router: Router,
                     private bookingsService: BookingsService,
                     private accountManagementService: AccountManagementService) {
    super(adminAuthenticationService);
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = this.bookingsService.bookings.getValue();
    this.displayedBookings = this.bookings;
    this.bookingsService.reloadBookings();

    this.isLoading = this.bookingsService.isLoading.getValue();
    this.addSub(this.bookingsService.isLoading.subscribe(l => this.isLoading = l));

    this.addSub(this.bookingsService.bookings.subscribe(b => {
      this.bookings = b;
      this.filterBookings();
    }));
  }

  public routeToBookingDetail(booking: Booking): void {
    let memberLogin: MemberLoginResponse = {
      entity: {adminBooking: booking},
      authToken: this.adminAuthenticationService.getEncodedToken()
    } as MemberLoginResponse;

    this.accountManagementService.loginMember(memberLogin, true);
    this.router.navigate(['/admin-tool', 'anmeldung', booking.id]);
  }

  public onSorted(criteria: ColumnSortCriteria): void {
    this.displayedBookings = this.bookings.sort((a, b) => SortHelper.sortHandler(a, b, criteria));
  }

  public togglePackage(fitPackage: FitPackage) {
    if (this.displayedPackages.indexOf(fitPackage) === -1) {
      this.displayedPackages.push(fitPackage);
    } else {
      ArrayUtils.deleteElement(this.displayedPackages, fitPackage);
    }
    this.filterBookings();
  }

  public filterBookings(): void {
    this.displayedBookings = this.bookings
      .filter((booking: Booking) => {

        let condition: boolean = this.displayedPackages.indexOf(booking.fitPackage.discriminator) !== -1;

        if (condition && booking.company != null) {
          condition = booking.company.name.toLowerCase().includes(this.companyFilter.toLowerCase());
        }

        return condition;
      });
  }

  public async downloadImages(): Promise<void> {
    let event: Event = this.eventService.selectedEvent.getValue();
    let data = await this.mediaDAO.downloadImages(event);
    FileSaver.saveAs(data, 'images.zip');
  }
}
