import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { BookingDAO } from '../../../../core/dao/booking.dao';
import { Booking } from '../../../../core/model/booking';
import { EventService } from '../../../../core/app-services/event.service';
import { AppConfig } from '../../../../core/app-config/app-config.service';

import { SortHelper } from '../../../../core/app-helper/sort-helper';
import { ColumnSortCriteria } from '../../../../core/app-helper/helper-model/column-sort-criteria';
import { FitPackage } from '../../../../core/model/enums/fit-package';
import { ArrayUtils } from '../../../../core/utils/array-utils';
import { AccountManagementService } from '../../../../core/app-services/account-managenment.service';
import { MemberLoginResponse } from '../../../../core/app-helper/helper-model/member-login-response';
import { IsAccepted } from '../../../../core/model/enums/is-accepted';
import { getMemberStatusHTML, MemberStatus } from '../../../../core/model/enums/member-status';
import { BookingsService } from '../../services/bookings.service';

@Component({
  selector: 'fit-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  // for template use
  public IsAccepted = IsAccepted;

  @Output()
  public sorted = new EventEmitter();

  public displayedBookings: Booking[];
  public bookings: Booking[];

  public loading: boolean = true;
  public imageDownloadLink: string;

  public companyFilter: string = '';

  public displayedPackages: FitPackage[] = [FitPackage.BasicPack, FitPackage.SponsorPack, FitPackage.LecturePack];

  public helper: Booking[];

  public constructor(private bookingDAO: BookingDAO,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private router: Router,
                     private bookingsService: BookingsService,
                     private accountManagementService: AccountManagementService) {
    this.imageDownloadLink = this.appConfig.serverURL + '/media';
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = this.bookingsService.bookings.getValue();
    this.displayedBookings = this.bookings;
    this.loading = false;

    this.bookingsService.bookings.subscribe(b => {
      this.bookings = b;
      this.filterBookings();
    });
  }

  public routeToBookingDetail(booking: Booking): void {
    this.accountManagementService.loginMember({adminBooking: booking} as MemberLoginResponse, true);
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

  public getMemberStatusHTML(status: MemberStatus): string {
    return getMemberStatusHTML(status);
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
}
