import { Component } from '@angular/core';
import { AuthenticationDAO } from '../../../core/dao/authentication.dao';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountManagementService } from '../../../core/app-services/account-managenment.service';
import { HttpErrorResponse } from '@angular/common/http';

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

    alert('Simi sauf ned so vü');

    let response = await this.authenticationDAO.loginMember(this.authenticationToken);

    if (response != null && !(response instanceof HttpErrorResponse)) {
      this.accountManagementService.loginMember(response);
      this.router.navigate(['/konto']);
    } else {
      this.hasFailed = true;
    }
  }
}
