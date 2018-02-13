import { Component, OnInit } from '@angular/core';
import { AuthenticationDao } from '../../core/dao/authentication.dao';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BookingRegistrationService } from '../../core/app-services/booking-registration.service';
import { ModalWindowService } from '../../core/app-services/modal-window.service';

@Component({
  selector: 'fit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public registrationAllowed: boolean = true;
  public authenticationToken: string = '';
  public hasFailed: boolean = false;

  public constructor(private authenticationDAO: AuthenticationDao,
                     private bookingRegistrationService: BookingRegistrationService,
                     private router: Router,
                     private toastr: ToastrService) {
  }

  public ngOnInit() {
  }

  public async loginToBooking(): Promise<void> {
    this.hasFailed = false;
    let response = await this.authenticationDAO.loginBooking(this.authenticationToken);

    if (response.errorMessage != null) {
      this.toastr.error(response.errorMessage);
      this.hasFailed = true;
    } else {
      if (response.booking != null) {
        this.bookingRegistrationService.setBooking(response.booking);
      } else if (response.company != null) {
        this.bookingRegistrationService.setBooking(response.company);
      }
      this.router.navigate(['fit', 'anmelden']);
    }
  }
}
