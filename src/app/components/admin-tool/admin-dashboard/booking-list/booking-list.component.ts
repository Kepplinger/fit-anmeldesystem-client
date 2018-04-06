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
  nameSearch: string ="";
  placeSearch: string= "";
  @Output()
  sorted = new EventEmitter();

  private columnSortedSubscription: Subscription;


  public bookings: Booking[];
  public loading: boolean = true;
  public imageDownloadLink: string;
  public tmpBookings:Booking[];

  public checkedBasic:string = '-1';
  public checkedSponsor:string = '-1';
  public checkedPremium:string = '-1';

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
    this.tmpBookings = this.bookings;
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
    console.log();
    var alphas:string[];
    alphas = criteria.sortColumn.split('.');
    return this.bookings.sort((a,b) => {
    if(alphas.length==1) {
      if (criteria.sortDirection === 'desc') {
        if (a[criteria.sortColumn] < b[criteria.sortColumn])
          return 1;
        if (a[criteria.sortColumn] == b[criteria.sortColumn])
          return 0;
        if (a[criteria.sortColumn] > b[criteria.sortColumn])
          return -1;
      }
      else {

        if (a[criteria.sortColumn] < b[criteria.sortColumn])
          return -1;
        if (a[criteria.sortColumn] == b[criteria.sortColumn])
          return 0;
        if (a[criteria.sortColumn] > b[criteria.sortColumn])
          return 1;
      }
    }else{
      if (criteria.sortDirection === 'desc') {
        if (a[alphas[0]][alphas[1]] < b[alphas[0]][alphas[1]])
          return 1;
        if (a[alphas[0]][alphas[1]] == b[alphas[0]][alphas[1]])
          return 0;
        if (a[alphas[0]][alphas[1]] > b[alphas[0]][alphas[1]])
          return -1;
      }
      else {

        if (a[alphas[0]][alphas[1]] < b[alphas[0]][alphas[1]])
          return -1;
        if (a[alphas[0]][alphas[1]] == b[alphas[0]][alphas[1]])
          return 0;
        if (a[alphas[0]][alphas[1]] > b[alphas[0]][alphas[1]])
          return 1;
      }
    }
    });
  }

  public searchName(){
    this.bookings=this.tmpBookings.filter(c => c.company.name.toLowerCase().includes(this.nameSearch.toLowerCase()));//.filter(e=>e.location.number.toLowerCase().includes(this.placeSearch.toLowerCase()));
  }
  public helper:Booking[];

  public tickCheckbox(tmp:number){
    this.helper=[];
    if(tmp==0)
    {
      if(this.checkedBasic=='Basispaket')
        this.checkedBasic='-1';
      else
        this.checkedBasic='Basispaket';
    }
    if(tmp==1)
    {
      if(this.checkedSponsor=='Sponsorpaket')
        this.checkedSponsor='-1';
      else
        this.checkedSponsor='Sponsorpaket';
    }
    if(tmp==2){
      if(this.checkedPremium=='Vortragspaket')
        this.checkedPremium='-1';
      else
        this.checkedPremium='Vortragspaket';
    }
    if(this.checkedBasic=='-1'&&this.checkedSponsor=='-1'&&this.checkedPremium=='-1')
    {
      this.bookings=this.tmpBookings;
    }
    else {
      this.bookings = [];
      console.log(this.helper);
      this.bookings = this.bookings.concat(this.tmpBookings.filter(c => c.fitPackage.name.toLowerCase()
        .includes(this.checkedBasic.toLowerCase())), this.tmpBookings.filter(c => c.fitPackage.name.toLowerCase()
        .includes(this.checkedSponsor.toLowerCase())),this.tmpBookings.filter(c => c.fitPackage.name.toLowerCase()
        .includes(this.checkedSponsor.toLowerCase())));
      console.log(this.helper);
    }

  }

}
export class CustomerSearchCriteria {
  sortColumn: string;
  sortDirection: string;
}
