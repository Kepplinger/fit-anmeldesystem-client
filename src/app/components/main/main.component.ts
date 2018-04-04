import { Component, OnInit } from '@angular/core';
import { AuthenticationDAO } from '../../core/dao/authentication.dao';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FitRegistrationService } from '../../core/app-services/fit-registration.service';

@Component({
  selector: 'fit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public registrationAllowed: boolean = true;
  public authenticationToken: string = '';
  public hasFailed: boolean = false;

  public constructor(private authenticationDAO: AuthenticationDAO,
                     private bookingRegistrationService: FitRegistrationService,
                     private router: Router,
                     private toastr: ToastrService) {
  }

  public ngOnInit() {
  }

  public async loginToBooking(): Promise<void> {
    this.hasFailed = false;
    let response = await this.authenticationDAO.loginCompany(this.authenticationToken);

    if (response != null && response.error == null) {
      if (response.oldBooking != null) {
        this.bookingRegistrationService.setBooking(response.oldBooking, false);
      } else if (response.currentBooking != null) {
        this.bookingRegistrationService.setBooking(response.currentBooking, true);
      } else if (response.company != null) {
        this.bookingRegistrationService.setCompany(response.company);
      }
      this.router.navigate(['fit', 'anmelden']);
    } else {
      this.hasFailed = true;
    }
  }
}
