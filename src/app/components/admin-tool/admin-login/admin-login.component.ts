import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthorizationService } from '../../../core/app-services/admin-authorization.service';

@Component({
  selector: 'fit-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public email: string;
  public password: string;
  public hasLoginFailed: boolean = false;

  public constructor(private router: Router,
                     private adminAuthorizationService: AdminAuthorizationService) {
  }

  public ngOnInit() {
  }

  public async loginAdmin(): Promise<void> {
    if (await this.adminAuthorizationService.loginAdmin(this.email, this.password)) {
      this.router.navigate(['/admin-tool', 'dash']);
    } else {
      this.hasLoginFailed = true;
    }
  }
}
