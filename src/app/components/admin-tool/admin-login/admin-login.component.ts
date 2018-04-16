import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationDAO } from '../../../core/dao/authentication.dao';
import { AuthDAO } from '../../../core/dao/auth.dao';

@Component({
  selector: 'fit-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public email: string;
  public password: string;

  public constructor(private router: Router,
                     private authDAO: AuthDAO) { }

  public ngOnInit() {
  }

  public async loginAdmin(): Promise<void> {
    // await this.authDAO.loginAdmin(this.email, this.password);
    this.router.navigate(['admin-tool/dash']);
  }
}
