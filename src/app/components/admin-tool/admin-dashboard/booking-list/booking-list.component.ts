import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';

import { BookingTransferService } from '../../../../core/app-services/booking-transfer.service';
import { BookingDAO } from '../../../../core/dao/booking.dao';
import { Booking } from '../../../../core/model/booking';
import { EventService } from '../../../../core/app-services/event.service';
import { AppConfig } from '../../../../core/app-config/app-config.service';
import { CsvCreatorService } from '../../services/csv-creator.service';

import { Subscription } from 'rxjs/Subscription';
import {SortService} from '../../../../core/app-services/sort-service.service';

@Component({
  selector: 'fit-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit,OnDestroy {

  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;


  public bookings: Booking[];
  public loading: boolean = true;
  public imageDownloadLink: string;

  public constructor(private bookingDAO: BookingDAO,
                     private eventService: EventService,
                     private appConfig: AppConfig,
                     private router: Router,
                     private bookingTransferService: BookingTransferService,
                     private csvCreatorService: CsvCreatorService,
                     private sortService:SortService) {
    this.imageDownloadLink = this.appConfig + '/media';
  }

  public async ngOnInit(): Promise<void> {
    this.bookings = await this.bookingDAO.fetchAllBookings();
    this.loading = false;
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe(event => {
      this.sorted.emit(event);
    });
  }

  public routeToCsvExport(): void {
    this.csvCreatorService.setBookings(this.bookings);
    this.router.navigate(['/admin-tool', 'csv-export']);
  }

  public routeToBookingDetail(booking: Booking): void {
    this.bookingTransferService.addBooking(booking);
    this.router.navigate(['/admin-tool', 'anmeldung', booking.id]);
  }

  ngOnDestroy() {
    this.columnSortedSubscription.unsubscribe();
  }

  onSorted($event){
    this.sortList($event);
  }

  private sortList($event: CustomerSearchCriteria ) {
    this.bookings = this.getCustomers($event);
  }



  getCustomers(criteria: CustomerSearchCriteria): Booking[] {
    console.log(criteria.sortColumn);
    console.log()
    return this.bookings.sort((a,b) => {
      if(criteria.sortDirection === 'desc'){
        console.log(a[criteria.sortColumn]);

        if(a[criteria.sortColumn] < b[criteria.sortColumn])
           return 1;
        if(a[criteria.sortColumn] == b[criteria.sortColumn])
          return 0;
        if(a[criteria.sortColumn] > b[criteria.sortColumn])
          return -1;
      }
      else {

        if(a[criteria.sortColumn] < b[criteria.sortColumn])
          return -1;
        if(a[criteria.sortColumn] == b[criteria.sortColumn])
          return 0;
        if(a[criteria.sortColumn] > b[criteria.sortColumn])
          return 1;
      }
    });
  }

}
export class CustomerSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}
