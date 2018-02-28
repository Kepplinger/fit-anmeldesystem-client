import { Component } from '@angular/core';
import { ApplicationStateService } from './core/app-services/application-state.service';
import { FitApplication } from './core/model/enums/fit-application';
import { RouterService } from './core/app-services/router.service';
import { EventService } from './core/app-services/event.service';

@Component({
  selector: 'fit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  FitApplication = FitApplication;

  // noinspection JSUnusedLocalSymbols
  public constructor(private applicationStateService: ApplicationStateService,
                     private eventService: EventService,
                     private routerService: RouterService) {
  }

  public getApplicationState(): FitApplication {
    return this.applicationStateService.activatedApplication;
  }

}
