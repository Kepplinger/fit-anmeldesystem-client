import { Component, OnInit } from '@angular/core';
import { AuthenticationDAO } from '../../core/dao/authentication.dao';
import { Router } from '@angular/router';
import { AccountManagementService } from '../../core/app-services/account-managenment.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EventService } from '../../core/app-services/event.service';
import { Event } from '../../core/model/event';
import { ErrorInterceptor } from '../../core/dao/helper/error-interceptor';
import { ToastrService } from 'ngx-toastr';
import { FitHttpError } from '../../core/app-helper/helper-model/fit-http-error';
import { BaseSubscriptionComponent } from '../../core/base-components/base-subscription.component';

@Component({
  selector: 'fit-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseSubscriptionComponent implements OnInit {

  public loginCode: string = '';
  public hasFailed: boolean = false;
  public event: Event;

  public isLoading: boolean = false;

  public constructor(private authenticationDAO: AuthenticationDAO,
                     private accountManagementService: AccountManagementService,
                     private eventService: EventService,
                     private toastr: ToastrService,
                     private router: Router) {
    super();
  }

  public ngOnInit() {
    this.event = this.eventService.currentEvent.getValue();

    this.addSub(this.eventService.currentEvent.subscribe((event: Event) => {
      this.event = event;
    }));
  }

  public async loginToBooking(): Promise<void> {
    this.hasFailed = false;

    this.isLoading = true;
    let response = await this.authenticationDAO.loginMember(this.loginCode);
    this.isLoading = false;

    if (response != null && !(response instanceof FitHttpError)) {
      if (this.accountManagementService.loginMember(response, true)) {
        this.toastr.success('Angemeldet!');
        this.router.navigate(['/fit', 'anmelden']);
      } else {
        this.hasFailed = true;
        this.toastr.error('Nur Firmen-Codes sind bei dieser Anmeldung erlaubt.', 'Anmeldung fehlgeschlagen!');
      }
    } else {
      this.hasFailed = true;
    }
  }
}
