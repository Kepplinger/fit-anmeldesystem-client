import { Component, OnInit } from '@angular/core';
import { AuthenticationDao } from '../../core/dao/authentication.dao';

@Component({
  selector: 'fit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public registrationAllowed: boolean = true;
  public authenticationToken: string = '';

  public constructor(private authenticationDAO: AuthenticationDao) {
  }

  public ngOnInit() {
  }

  public loginToBooking(): void {
    this.authenticationDAO.loginBooking(this.authenticationToken);
  }
}
