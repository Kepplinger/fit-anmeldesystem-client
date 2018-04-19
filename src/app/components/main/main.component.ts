import { Component, OnInit } from '@angular/core';
import { AuthenticationDAO } from '../../core/dao/authentication.dao';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BookingMapper } from '../../core/model/mapper/booking-mapper';
import { AccountManagementService } from '../../core/app-services/account-managenment.service';
import { HttpErrorResponse } from '@angular/common/http';

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
                     private accountManagementService: AccountManagementService,
                     private router: Router) {
  }

  public ngOnInit() {
  }

  public async loginToBooking(): Promise<void> {
    this.hasFailed = false;
    let response = await this.authenticationDAO.loginCompany(this.authenticationToken);

    if (response != null && !(response instanceof HttpErrorResponse)) {
      this.accountManagementService.loginMember(response);
      this.router.navigate(['/fit', 'anmelden']);
    } else {
      this.hasFailed = true;
    }
  }
}
