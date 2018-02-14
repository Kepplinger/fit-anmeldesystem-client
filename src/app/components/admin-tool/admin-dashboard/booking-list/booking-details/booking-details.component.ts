import { Component } from '@angular/core';
import { Booking } from '../../../../../core/model/booking';
import { BookingTransferService } from '../../../../../core/app-services/booking-transfer.service';

@Component({
  selector: 'fit-booking-detail',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {

  public booking: Booking;

  public constructor(private bookingTransferService: BookingTransferService) {
  }

}
