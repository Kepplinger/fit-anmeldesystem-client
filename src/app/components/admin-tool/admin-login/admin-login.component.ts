import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthorizationService } from '../../../core/app-services/user-authorization.service';

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
                     private userAuthorizationService: UserAuthorizationService) {
  }

  public ngOnInit() {
  }

  public async loginAdmin(): Promise<void> {
    if (await this.userAuthorizationService.loginAdmin(this.email, this.password)) {
      this.router.navigate(['/admin-tool', 'dash']);
    } else {
      this.hasLoginFailed = true;
    }
  }
}
