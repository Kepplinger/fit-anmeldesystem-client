import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { ApplicationStateService } from './application-state.service';
import { FitApplication } from '../model/enums/fit-application';

@Injectable()
export class RouterService {

  public constructor(private router: Router,
                     private applicationStateService: ApplicationStateService) {
    router.events.subscribe(
      (event: Event) => {
        if (event instanceof NavigationEnd) {
          if (event.url.includes('admin-tool')) {
            applicationStateService.setApplicationState(FitApplication.AdminTool);
          } else if (event.url.includes('konto')) {
            applicationStateService.setApplicationState(FitApplication.AccountManagement);
          } else {
            applicationStateService.setApplicationState(FitApplication.FitRegistration);
          }
        }
      });
  }
}
