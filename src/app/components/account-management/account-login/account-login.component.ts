import { Component } from '@angular/core';
import { AuthenticationDAO } from '../../../core/dao/authentication.dao';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountManagementService } from '../../../core/app-services/account-managenment.service';

@Component({
  selector: 'fit-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.scss']
})
export class AccountLoginComponent {

  public authenticationToken: string = '';
  public hasFailed: boolean = false;

  public constructor(private authenticationDAO: AuthenticationDAO,
                     private toastr: ToastrService,
                     private accountManagementService: AccountManagementService,
                     private router: Router) {
  }

  public async loginToCompanyAccount(): Promise<void> {
    this.hasFailed = false;
    let response = await this.authenticationDAO.loginCompany(this.authenticationToken);

    if (response.errorMessage != null) {
      this.toastr.error(response.errorMessage);
      this.hasFailed = true;
    } else {
      if (response.booking != null) {
        this.accountManagementService.setBooking(response.booking);
      } else if (response.company != null) {
        this.accountManagementService.setCompany(response.company);
      }
      this.router.navigate(['/konto']);
    }
  }
}
