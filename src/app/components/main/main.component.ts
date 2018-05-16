import { Component, OnInit } from '@angular/core';
import { AuthenticationDAO } from '../../core/dao/authentication.dao';
import { Router } from '@angular/router';
import { AccountManagementService } from '../../core/app-services/account-managenment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../../core/app-services/event.service';
import { Event } from '../../core/model/event';

@Component({
  selector: 'fit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public authenticationToken: string = '';
  public hasFailed: boolean = false;
  public event: Event;

  public constructor(private authenticationDAO: AuthenticationDAO,
                     private accountManagementService: AccountManagementService,
                     private eventService: EventService,
                     private router: Router) {
  }

  public ngOnInit() {
    this.event = this.eventService.currentEvent.getValue();

    this.eventService.currentEvent.subscribe((event: Event) => {
      this.event = event;
    });
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
